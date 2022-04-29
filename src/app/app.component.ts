import { StorageService } from './services/ionic/storage.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { AlertService, SettingsService } from './services';
import { App } from '@capacitor/app';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private storageService: StorageService,
        private platform: Platform,
        public location: Location,
        private alertService: AlertService,
        private settingsService: SettingsService
    ) {}

    async ngOnInit() {
        await this.storageService.startDB();
        this.addEventBackButton();
        this.getVersion();
    }

    addEventBackButton() {
        this.platform.backButton.subscribeWithPriority(
            10,
            async (processNextHandler) => this.onBackButton(processNextHandler)
        );
    }

    async onBackButton(processNextHandler: any): Promise<void> {
        if (
            this.location.isCurrentPathEqualTo('/tab/tournaments') ||
            this.location.isCurrentPathEqualTo('/tab/cars') ||
            this.location.isCurrentPathEqualTo('/tab/account')
        ) {
            await this.alertService.presentAlertWithButtons(
                'Salir',
                '¿Estás seguro de salir?',
                [
                    { text: 'No', role: 'cancel' },
                    { text: 'Si', handler: () => App.exitApp() },
                ]
            );
            if (processNextHandler) {
                processNextHandler();
            }
        } else {
            this.location.back();
        }
    }

    async getVersion() {
        console.log(this.platform.platforms());
        if (this.platform.is('android') || this.platform.is('ios')) {
            const info = await App.getInfo();
            const version = info.version;
            const platform = this.platform.is('android') ? 'android' : 'ios';
            this.settingsService.checkUpdate({ platform, version }).subscribe({
                next: (response) => {
                    if (response.mandatory) {
                        this.onMandatoryUpdate(platform);
                    } else if (response.update) {
                        this.isAvailableUpdate(platform);
                    }
                },
                error: (error) => {},
            });
        }
    }

    onMandatoryUpdate(platform: string) {
        this.alertService.presentAlertWithButtons(
            'Actualización obligatoria',
            'Es necesario actualizar la aplicación para poder continuar',
            [{ text: 'Ok', handler: () => this.goToMarket(platform) }]
        );
    }

    isAvailableUpdate(platform: string) {
        this.alertService.presentAlertWithButtons(
            'Actualización disponible',
            '¿Quieres actualizar la aplicacion?',
            [
                { text: 'No', role: 'cancel' },
                { text: 'Si', handler: () => this.goToMarket(platform) },
            ]
        );
    }

    goToMarket(platform: string) {
        this.alertService.presentAlert(
            'No disponible',
            'Esta función no está disponible actualmente'
        );
        // open market in ionic
    }
}

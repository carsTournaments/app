import { StorageService } from './services/ionic/storage.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { AlertService, SettingsService } from './services';
import { App, URLOpenListenerEvent } from '@capacitor/app';

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
        private settingsService: SettingsService,
        private zone: NgZone,
        private navCtrl: NavController
    ) {
        this.initializeApp();
    }

    async ngOnInit() {
        await this.storageService.startDB();
        this.addEventBackButton();
        this.settingsService.checkUpdateApp();
    }

    initializeApp() {
        App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
            console.log('appUrlOpen');
            this.zone.run(() => {
                const domain = 'carsTournaments.carsites.es';
                const pathArray = event.url.split(domain);
                const appPath = pathArray.pop();
                if (appPath) {
                    this.navCtrl.navigateRoot(appPath);
                }
            });
        });
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
}

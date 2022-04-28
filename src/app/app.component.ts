import { StorageService } from './services/ionic/storage.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { AlertService } from './services';
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
        private alertService: AlertService
    ) {}

    async ngOnInit() {
        await this.storageService.startDB();
        this.addEventBackButton();
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

import { StorageService } from './shared/services/ionic/storage-ionic.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';

import { App, URLOpenListenerEvent } from '@capacitor/app';
import { User } from '@models';
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { TogglesService } from '@core/toggles/toggles.service';
import {
    AlertService,
    AnalyticsService,
    GoogleAuthService,
    NotificationsPushService,
    SettingsService,
} from '@services';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private storageService: StorageService,
        private platform: Platform,
        private alertService: AlertService,
        private settingsService: SettingsService,
        private zone: NgZone,
        private navCtrl: NavController,
        private analyticsService: AnalyticsService,
        private notificationsPushService: NotificationsPushService,
        private togglesService: TogglesService,
        private googleAuthService: GoogleAuthService,
        public location: Location
    ) {
        this.initializeDeepLinks();
        this.analyticsService.start();
        this.googleAuthService.init();
    }

    async ngOnInit(): Promise<void> {
        await this.storageService.startDB();
        this.addEventBackButton();
        this.settingsService.getSettingsDB();
        this.checkUserLogged();
        this.ota();
    }

    async ota() {
        if (await this.togglesService.isActiveToggle('ota')) {
            if (this.platform.is('capacitor')) {
                CapacitorUpdater.notifyAppReady();
            }
        }
    }

    initializeDeepLinks(): void {
        App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
            this.zone.run(() => {
                const domain = 'carstournaments.com';
                const pathArray = event.url.split(domain);
                const appPath = pathArray.pop();
                if (appPath) {
                    this.navCtrl.navigateRoot(appPath);
                }
            });
        });
    }

    addEventBackButton(): void {
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
            this.analyticsService.logEvent('backButton', {});
            const alert = await this.alertService.presentAlertWithButtons(
                'Salir',
                '¿Estás seguro de salir?',
                [
                    { text: 'No', role: 'cancel' },
                    { text: 'Si', role: 'ok' },
                ]
            );
            const data = await alert.onDidDismiss();
            if (data.role === 'ok') {
                this.analyticsService.logEvent('backButton_exit', {});
                App.exitApp();
            } else {
                this.analyticsService.logEvent('backButton_canceled', {});
                processNextHandler();
            }
        } else {
            this.location.back();
        }
    }

    async checkUserLogged() {
        const user: User = await this.storageService.get('user');
        this.notificationsPushService.registerFCM(user ?? null);
    }
}

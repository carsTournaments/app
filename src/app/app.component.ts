import { StorageService } from './shared/services/ionic/storage-ionic.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import {
    AlertService,
    AnalyticsService,
    NotificationsPushService,
    SettingsService,
} from './shared/services';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { User } from '@models';
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { SplashScreen } from '@capacitor/splash-screen';

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
        public location: Location
    ) {
        this.initializeDeepLinks();
        this.analyticsService.start();
    }

    async ngOnInit(): Promise<void> {
        await this.storageService.startDB();
        // await this.ota()
        this.addEventBackButton();
        this.settingsService.getSettingsDB();
        this.checkUserLogged();
    }

    async ota() {
        let data = { version: '' };
        App.addListener('appStateChange', async (state) => {
            if (state.isActive) {
                // Do the download during user active app time to prevent failed download
                data = await CapacitorUpdater.download({
                    url: 'https://carstournaments.carsites.es/uploads/ota/www.zip',
                });
            }
            if (!state.isActive && data.version !== '') {
                // Do the switch when user leave app
                SplashScreen.show();
                try {
                    await CapacitorUpdater.set(data);
                } catch (error) {
                    SplashScreen.hide(); // in case the set fail, otherwise the new app will have to hide it
                }
            }
        });
    }

    initializeDeepLinks(): void {
        App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
            this.zone.run(() => {
                const domain = 'carstournaments.carsites.es';
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

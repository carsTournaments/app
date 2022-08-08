import { StorageService } from './shared/services/ionic/storage-ionic.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';

import { App, URLOpenListenerEvent } from '@capacitor/app';
import { User } from '@models';
import { ToggleService } from '@core/services/toggle.service';
import {
  AlertService,
  AnalyticsService,
  AppUpdateService,
  FirebaseAuthenticationService,
  NotificationsPushService,
  SettingsService,
} from '@services';
import { TranslateService } from '@ngx-translate/core';

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
    private togglesService: ToggleService,
    private firebaseAuthenticationService: FirebaseAuthenticationService,
    private location: Location,
    private translate: TranslateService,
    private appUpdateService: AppUpdateService
  ) {
    this.initializeDeepLinks();
    this.analyticsService.start();
    this.firebaseAuthenticationService.init();
  }

  async ngOnInit(): Promise<void> {
    this.translate.setDefaultLang('es');
    await this.storageService.startDB();
    this.addEventBackButton();
    this.settingsService.getSettingsDB();
    this.checkUserLogged();
    this.checkUpdate();
    this.changeDarkMode();
  }

  async checkUpdate() {
    if (this.platform.is('capacitor')) {
      await this.appUpdateService.performImmediateUpdate();
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
        this.translate.instant('app.titleExit'),
        this.translate.instant('app.messageExit'),
        [
          {
            text: this.translate.instant('generic.no'),
            role: 'cancel',
          },
          {
            text: this.translate.instant('generic.yes'),
            role: 'ok',
          },
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

  async changeDarkMode() {
    const state = await this.togglesService.isActiveToggle('general_darkmode');
    if (state) {
      const darkModeStorage = await this.storageService.getDarkMode();
      if (darkModeStorage === 'yes') {
        document.body.classList.toggle('dark');
      } else if (darkModeStorage === 'no') {
        document.body.classList.toggle('light');
      } else if (darkModeStorage === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDark.matches) {
          document.body.classList.toggle('dark');
        }
      }
    }
  }
}

import { StorageService } from './shared/services/ionic/storage-ionic.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { User } from '@models';
import { ToggleService } from '@core/services/toggle.service';
import {
  AnalyticsService,
  AppUpdateService,
  FirebaseAuthenticationService,
  NotificationsPushService,
  SettingsService,
} from '@services';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [AppService],
})
export class AppComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private platform: Platform,
    private settingsService: SettingsService,
    private analyticsService: AnalyticsService,
    private notificationsPushService: NotificationsPushService,
    private togglesService: ToggleService,
    private firebaseAuthenticationService: FirebaseAuthenticationService,
    private translate: TranslateService,
    private appUpdateService: AppUpdateService,
    private appService: AppService
  ) {
    this.appService.initializeDeepLinks();
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
      const state = await this.togglesService.isActiveToggle(
        'general_appUpdate'
      );
      if (this.platform.is('android') && state) {
        await this.appUpdateService.performImmediateUpdate();
      }
    }
  }

  addEventBackButton(): void {
    this.platform.backButton.subscribeWithPriority(
      10,
      async (processNextHandler) =>
        this.appService.onBackButton(processNextHandler)
    );
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

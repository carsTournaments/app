import { Injectable, NgZone } from '@angular/core';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { NavController } from '@ionic/angular';
import { AlertService, AnalyticsService } from '@services';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(
    private zone: NgZone,
    private navCtrl: NavController,
    private analyticsService: AnalyticsService,
    private translate: TranslateService,
    private location: Location,
    private alertService: AlertService
  ) {}

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
}

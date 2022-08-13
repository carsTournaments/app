import { ActionSheetIonicService } from './../../../../shared/services/ionic/action-sheet-ionic.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OptionItemI } from '@interfaces';
import {
  AuthService,
  AlertService,
  UserService,
  AnalyticsService,
  StorageService,
} from '@services';
import { TranslateService } from '@ngx-translate/core';
import { AccountViewModel } from '../../model/account.view-model';
import { config } from '@config';
import { ToggleService } from '@core/services/toggle.service';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
})
export class AccountPage {
  vm = new AccountViewModel();
  logged = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private analyticsService: AnalyticsService,
    private translate: TranslateService,
    private toggleService: ToggleService,
    private storageService: StorageService,
    private actionSheetService: ActionSheetIonicService
  ) {}

  async ionViewWillEnter(): Promise<void> {
    this.vm.loading = true;
    await this.isAuthenticated();
  }

  private async isAuthenticated(): Promise<void> {
    this.vm.user = this.userService.getUser();
    this.setOptions();
    if (this.vm.user) {
      this.getResume();
      this.logged = true;
    } else {
      this.logged = false;
    }
    this.vm.header.title = 'Tu cuenta';
    this.vm.loading = false;
  }

  getResume(): void {
    this.userService.getResume().subscribe({
      next: (res) => {
        this.vm.loading = false;
        this.vm.resume = res;
      },
      error: (err) => console.error(err),
    });
  }

  async setOptions() {
    this.vm.header.title = this.translate.instant('account.title');
    this.vm.options = [
      {
        id: 'myData',
        name: this.translate.instant('account.itemTitleMyData'),
        subtitle: this.translate.instant('account.itemSubtitleMyData'),
        route: config.routes.myData,
        state: true,
      },
      {
        id: 'myGarage',
        name: this.translate.instant('account.itemTitleGarage'),
        subtitle: this.translate.instant('account.itemSubtitleGarage'),
        route: config.routes.myGarage,
        state: true,
      },
      {
        id: 'myInscriptions',
        name: this.translate.instant('account.itemTitleInscriptions'),
        subtitle: this.translate.instant('account.itemSubtitleInscriptions'),
        route: config.routes.myInscriptions,
        state: true,
      },
      {
        id: 'myLikes',
        name: this.translate.instant('account.itemTitleLikes'),
        subtitle: this.translate.instant('account.itemSubtitleLikes'),
        route: config.routes.myLikes,
        state: true,
      },
      {
        id: 'myTrophies',
        name: this.translate.instant('account.itemTitleMyTrophies'),
        subtitle: this.translate.instant('account.itemSubtitleMyTrophies'),
        route: config.routes.myTrophies,
        state: true,
      },
      {
        id: 'darkMode',
        name: this.translate.instant('account.itemTitleDarkMode'),
        subtitle: this.translate.instant('account.itemSubtitleDarkMode'),
        value: 'darkMode',
        state: await this.toggleService.isActiveToggle('account_darkmode'),
      },
      {
        id: 'logout',
        name: this.translate.instant('account.itemTitleLogout'),
        subtitle: this.translate.instant('account.itemSubtitleLogout'),
        value: 'logout',
        state: true,
      },
    ];
  }

  onClickOption(item: OptionItemI): void {
    if (item.value) {
      if (item.value === 'logout') {
        this.analyticsService.logEvent(`dashboard_clickOption_${item.value}`);
        if (item.value === 'logout') {
          this.logout();
        }
      } else if (item.value === 'darkMode') {
        this.analyticsService.logEvent(`dashboard_clickOption_${item.value}`);
        this.openDarkModeOptions();
      }
    } else {
      this.analyticsService.logEvent(`dashboard_clickOption_${item.route}`);
      this.navCtrl.navigateForward(item.route);
    }
  }

  onLogged(): void {
    this.isAuthenticated();
  }

  async logout(): Promise<void> {
    const alert = await this.alertService.presentAlertWithButtons(
      this.translate.instant('account.titleLogout'),
      this.translate.instant('account.messageLogout'),
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
      this.analyticsService.logEvent('dashboard_logout_OK');
      this.logged = false;
      this.authService.logout();
    } else {
      this.analyticsService.logEvent('dashboard_logout_Cancel');
    }
  }

  onChangeTitle(event: any): void {
    this.vm.header.title = event;
  }

  async openDarkModeOptions() {
    const darkModeStatus = await this.storageService.getDarkMode();
    const buttons = [
      {
        text: 'Activar',
        data: 'yes',
        icon: 'checkmark',
      },
      {
        text: 'Desactivar',
        data: 'no',
        icon: 'close',
      },
      {
        text: 'Sistema',
        data: 'systemOn',
        icon: 'settings-outline',
      },
    ];
    if (darkModeStatus === 'yes') {
      buttons.splice(0, 1);
    } else if (darkModeStatus === 'no') {
      buttons.splice(1, 1);
    } else {
      buttons.splice(0, 3);
      buttons.push({
        text: 'Desactivar modo sistema',
        data: 'systemOff',
        icon: 'settings',
      });
    }
    const as = await this.actionSheetService.present('Modo oscuro', buttons);
    as.onDidDismiss().then((data) => {
      if (data) {
        this.darkMode(data.data);
      }
    });
  }

  darkMode(data: 'yes' | 'no' | 'systemOn' | 'systemOff'): void {
    if (data === 'yes' || data === 'no') {
      document.body.classList.toggle('dark');
      this.storageService.setDarkMode(data);
    } else if (data === 'systemOn') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      if (prefersDark.matches) {
        document.body.classList.toggle('dark');
      } else {
        document.body.classList.remove('dark');
      }
      this.storageService.setDarkMode('system');
    } else {
      if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
      }
      this.storageService.setDarkMode('no');
    }
  }
}

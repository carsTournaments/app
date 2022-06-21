import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OptionItemI } from '@interfaces';
import {
    AuthService,
    AlertService,
    UserService,
    AnalyticsService,
} from '@services';
import { AccountViewModel } from './model/account.view-model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-account',
    templateUrl: 'account.page.html',
    styleUrls: ['./account.page.scss'],
    providers: [TranslatePipe],
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
        private translatePipe: TranslatePipe
    ) {}

    async ionViewWillEnter(): Promise<void> {
        this.vm.loading = true;
        await this.isAuthenticated();
    }

    async isAuthenticated(): Promise<void> {
        this.vm.user = this.userService.getUser();
        if (this.vm.user) {
            this.getResume();
            this.setOptions();
            this.logged = true;
        } else {
            this.logged = false;
        }
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

    setOptions() {
        this.vm.header.title = this.translatePipe.transform('account.title');
        this.vm.options = [
            {
                name: this.translatePipe.transform('account.itemTitleMyData'),
                subtitle: this.translatePipe.transform(
                    'account.itemSubtitleMyData'
                ),
                route: 'my-data',
            },
            {
                name: this.translatePipe.transform('account.itemTitleGarage'),
                subtitle: this.translatePipe.transform(
                    'account.itemSubtitleGarage'
                ),
                route: 'garage',
            },
            {
                name: this.translatePipe.transform(
                    'account.itemTitleInscriptions'
                ),
                subtitle: this.translatePipe.transform(
                    'account.itemSubtitleInscriptions'
                ),
                route: 'inscriptions',
            },
            {
                name: this.translatePipe.transform('account.itemTitleLikes'),
                subtitle: this.translatePipe.transform(
                    'account.itemSubtitleLikes'
                ),
                route: 'likes',
            },
            {
                name: this.translatePipe.transform('account.itemTitleLogout'),
                subtitle: this.translatePipe.transform(
                    'account.itemSubtitleLogout'
                ),
                value: 'logout',
            },
        ];
    }

    onClickOption(item: OptionItemI): void {
        if (item.value) {
            this.analyticsService.logEvent(
                `dashboard_clickOption_${item.value}`
            );
            if (item.value === 'logout') {
                this.logout();
            }
        } else {
            this.analyticsService.logEvent(
                `dashboard_clickOption_${item.route}`
            );
            this.navCtrl.navigateForward(item.route);
        }
    }

    onLogged(): void {
        this.isAuthenticated();
    }

    updateUser(): void {
        this.userService.update(this.vm.user).subscribe({
            next: () => {
                this.analyticsService.logEvent('dashboard_changeName_OK', {
                    params: { status: true },
                });
                this.alertService.presentAlert(
                    '¡Listo!',
                    'Nombre cambiado correctamente.'
                );
            },
            error: () => {
                this.analyticsService.logEvent('dashboard_changeName_KO');
                this.alertService.presentAlert(
                    '¡Vaya!',
                    'No se ha podido cambiar el nombre.'
                );
            },
        });
    }

    async logout(): Promise<void> {
        const alert = await this.alertService.presentAlertWithButtons(
            this.translatePipe.transform('account.titleLogout'),
            this.translatePipe.transform('account.messageLogout'),
            [
                {
                    text: this.translatePipe.transform('generic.no'),
                    role: 'cancel',
                },
                {
                    text: this.translatePipe.transform('generic.yes'),
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
}

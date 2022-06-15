import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OptionItemI } from '@interfaces/option-item.interface';
import {
    AuthService,
    AlertService,
    UserService,
    AnalyticsService,
} from '@services';
import { AccountViewModel } from './model/account.view-model';

@Component({
    selector: 'app-account',
    templateUrl: 'account.page.html',
    styleUrls: ['./account.page.scss'],
})
export class AccountPage {
    vm = new AccountViewModel();
    logged = false;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private navCtrl: NavController,
        private alertService: AlertService,
        private analyticsService: AnalyticsService
    ) {}

    async ionViewWillEnter(): Promise<void> {
        this.vm.loading = true;
        await this.isAuthenticated();
    }

    async isAuthenticated(): Promise<void> {
        this.vm.user = this.userService.getUser();
        if (this.vm.user) {
            this.getResume();
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

    onClickOption(item: OptionItemI): void {
        if (item.value) {
            this.analyticsService.logEvent(
                `dashboard_clickOption_${item.value}`
            );
            if (item.value === 'changeName') {
                this.changeName();
            } else if (item.value === 'changePassword') {
                this.analyticsService.logEvent('dashboard_changePassword');
                this.alertService.presentAlert(
                    '¡Vaya!',
                    'Esta función aún no está disponible.'
                );
            } else if (item.value === 'logout') {
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

    async changeName(): Promise<void> {
        const alert = await this.alertService.presentAlertWithInput(
            'Cambiar nombre',
            'Introduce nuevo nombre'
        );

        alert.onDidDismiss().then((data: any) => {
            if (data.data.values.input) {
                const inputData = data.data.values.input;
                this.vm.user.name = inputData;
                this.updateUser();
            }
        });
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
            'Cerrar sesión',
            '¿Estás seguro de cerrar sesión?',
            [
                { text: 'Cancelar', role: 'cancel' },
                { text: 'Aceptar', role: 'ok' },
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

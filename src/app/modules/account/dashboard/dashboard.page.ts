import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OptionItemI } from 'src/app/interfaces/option-item.interface';
import {
    AuthService,
    AlertService,
    UserService,
    AnalyticsService,
} from 'src/app/services';
import { DashboardViewModel } from './model/dashboard.view-model';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
    vm = new DashboardViewModel();
    logged = false;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private navCtrl: NavController,
        private alertService: AlertService,
        private analyticsService: AnalyticsService
    ) {}

    async ionViewWillEnter(): Promise<void> {
        await this.isAuthenticated();
    }

    async isAuthenticated(): Promise<void> {
        this.logged = this.authService.isAuthenticated();
        if (this.logged) {
            this.vm.user = await this.authService.getUser();
            this.getResume();
        }
    }

    getResume(): void {
        this.userService.getResume().subscribe({
            next: (res) => (this.vm.resume = res),
            error: (err) => console.error(err),
        });
    }

    onClickOption(item: OptionItemI): void {
        this.analyticsService.logEvent('dashboard_clickOption', {
            params: {
                option: item.value,
            },
        });
        if (item.value) {
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
                this.analyticsService.logEvent('dashboard_changeName', {
                    params: { status: true },
                });
                this.alertService.presentAlert(
                    '¡Listo!',
                    'Nombre cambiado correctamente.'
                );
            },
            error: () => {
                this.analyticsService.logEvent('dashboard_changeName', {
                    params: { status: false },
                });
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
            this.analyticsService.logEvent('dashboard_logoutOk');
            this.logged = false;
            this.authService.logout();
        } else {
            this.analyticsService.logEvent('dashboard_logoutCancel');
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OptionItemI } from 'src/app/interfaces/option-item.interface';
import { AuthService, AlertService, UserService } from 'src/app/services';
import { DashboardViewModel } from './model/dashboard.view-model';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    vm = new DashboardViewModel();
    logged = false;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private navCtrl: NavController,
        private alertService: AlertService
    ) {}

    async ngOnInit() {
        await this.isAuthenticated();
    }

    async isAuthenticated() {
        this.logged = this.authService.isAuthenticated();
        if (this.logged) {
            this.vm.user = await this.authService.getUser();
            this.getResume();
        }
    }

    logout() {
        this.alertService.presentAlertWithButtons(
            'Cerrar sesión',
            '¿Estás seguro de cerrar sesión?',
            [
                { text: 'Cancelar', role: 'cancel' },
                { text: 'Aceptar', handler: () => this.onLogoutClick() },
            ]
        );
    }

    onLogoutClick() {
        this.logged = false;
        this.authService.logout();
    }

    getResume() {
        this.userService.getResume().subscribe({
            next: (res) => (this.vm.resume = res),
            error: (err) => console.error(err),
        });
    }

    onClickOption(item: OptionItemI) {
        if (item.value) {
            if (
                item.value === 'changeName' ||
                item.value === 'changePassword'
            ) {
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

    onLogged() {
        this.isAuthenticated();
    }
}

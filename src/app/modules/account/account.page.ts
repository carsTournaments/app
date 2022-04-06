import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OptionItemI } from 'src/app/interfaces/option-item.interface';
import { AuthService, AlertService } from 'src/app/services';
import { AccountViewModel } from './model/account.view-model';

@Component({
    selector: 'app-account',
    templateUrl: 'account.page.html',
    styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
    vm = new AccountViewModel();
    logged = false;

    constructor(
        private authService: AuthService,
        private navCtrl: NavController,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.isAuthenticated();
    }

    async isAuthenticated() {
        this.logged = await this.authService.isAuthenticated();
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

    onClickOption(item: OptionItemI) {
        if (item.value) {
            if (item.value === 'logout') {
                this.logout();
            }
        } else {
            this.navCtrl.navigateForward(item.route);
        }
    }
}

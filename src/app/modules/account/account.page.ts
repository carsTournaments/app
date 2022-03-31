import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';
import { AccountViewModel } from './model/account.view-model';

@Component({
    selector: 'app-account',
    templateUrl: 'account.page.html',
    styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
    vm = new AccountViewModel();
    logged = false;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.isAuthenticated();
    }

    async isAuthenticated() {
        this.logged = await this.authService.isAuthenticated();
    }

    logout() {
        this.authService.logout();
        this.logged = false;
    }
}

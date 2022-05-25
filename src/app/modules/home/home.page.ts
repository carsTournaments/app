import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '@services';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    loading = true;
    logo = 'assets/images/logo.png';
    constructor(
        private navCtrl: NavController,
        private storageService: StorageService
    ) {}

    async ngOnInit() {
        this.loading = true;
        const firstTimeInApp = await this.storageService.get('home');
        if (firstTimeInApp) {
            this.enter();
        } else {
            this.loading = false;
        }
    }

    enter() {
        this.storageService.set('home', true);
        this.navCtrl.navigateRoot('/tab');
    }
}

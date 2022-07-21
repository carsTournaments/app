import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { AboutViewModel } from '../model/about.view-model';

@Component({
    selector: 'page-about',
    templateUrl: 'about.page.html',
    styleUrls: ['./about.page.scss'],
})
export class AboutPage {
    vm = new AboutViewModel();
    constructor(private platform: Platform) {}

    ionViewWillEnter() {
        this.getInfo();
    }

    async getInfo() {
        if (this.platform.is('capacitor')) {
            try {
                const info = await App.getInfo();
                this.vm.info = info;
            } catch (error) {
                console.log(error);
            }
        }
    }
}

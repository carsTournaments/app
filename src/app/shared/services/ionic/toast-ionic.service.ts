import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ToastIonicService {
    constructor(private toastCtrl: ToastController) {}

    async info(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            cssClass: 'toast-info',
            duration: 2500,
            mode: 'ios',
            icon: 'information-circle',
            position: 'top',
        });
        toast.present();
    }

    async error(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            cssClass: 'toast-error',
            duration: 2500,
            position: 'top',
            mode: 'ios',
            icon: 'bug',
        });
        toast.present();
    }
}

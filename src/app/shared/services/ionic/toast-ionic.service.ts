import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ToastIonicService {
    constructor(private toastCtrl: ToastController) {}

    async info(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 2000,
            position: 'top',
        });
        toast.present();
    }

    async error(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            cssClass: '',
            duration: 2000,
            position: 'top',
        });
        toast.present();
    }
}

import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class AlertService {
    constructor(private alertCtrl: AlertController) {}

    async presentAlert(
        header: string,
        message: string,
        cssClass = 'alert-custom',
        backdropDismiss = false
    ): Promise<void> {
        const alert = await this.alertCtrl.create({
            header,
            message,
            cssClass,
            backdropDismiss,
            mode: 'ios',
            buttons: ['OK'],
        });
        await alert.present();
    }

    async presentAlertWithInput(
        header: string,
        message: string,
        cssClass = 'alert-custom-with-buttons',
        backdropDismiss = false
    ): Promise<HTMLIonAlertElement> {
        const alert = await this.alertCtrl.create({
            header,
            message,
            cssClass,
            backdropDismiss,
            mode: 'ios',
            inputs: [
                {
                    name: 'input',
                    type: 'text',
                    placeholder: 'Introduce nuevo nombre',
                },
            ],
            buttons: ['Cancelar', 'Aceptar'],
        });
        await alert.present();
        return alert;
    }

    async presentAlertWithButtons(
        header: string,
        message: string,
        buttons: any[],
        cssClass = 'alert-custom-with-buttons',
        backdropDismiss = false
    ) {
        const alert = await this.alertCtrl.create({
            header,
            message,
            cssClass,
            backdropDismiss,
            buttons,
            mode: 'ios',
        });
        await alert.present();
    }
}

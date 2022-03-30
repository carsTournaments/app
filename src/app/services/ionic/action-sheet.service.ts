import { Injectable } from '@angular/core';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ActionSheetService {
    constructor(private actionSheetCtrl: ActionSheetController) {}

    async present(header: string, buttons: ActionSheetButton[]): Promise<void> {
        const actionSheet = await this.actionSheetCtrl.create({
            header,
            buttons,
        });

        await actionSheet.present();
    }
}

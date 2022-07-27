import { Injectable } from '@angular/core';
import {
  ActionSheetButton,
  ActionSheetController,
  ActionSheetOptions,
} from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ActionSheetIonicService {
  constructor(private actionSheetCtrl: ActionSheetController) {}

  async present(
    header: string,
    buttons: ActionSheetButton[]
  ): Promise<HTMLIonActionSheetElement> {
    const options: ActionSheetOptions = {
      header,
      buttons,
      cssClass: 'action-sheet-primary',
      mode: 'ios',
    };
    const actionSheet = await this.actionSheetCtrl.create(options);
    await actionSheet.present();
    return actionSheet;
  }
}

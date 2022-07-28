import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'my-garage-image-popover',
  templateUrl: 'my-garage-image-popover.component.html',
})
export class MyGarageImagePopoverComponent {
  constructor(private popoverCtrl: PopoverController) {}

  async onClick(type: string) {
    this.popoverCtrl.dismiss(type);
  }
}

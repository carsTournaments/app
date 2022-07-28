import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'my-garage-popover',
  templateUrl: 'my-garage-popover.component.html',
})
export class MyGaragePopoverComponent {
  constructor(private popoverCtrl: PopoverController) {}

  async onClick(type: string) {
    this.popoverCtrl.dismiss(type);
  }
}

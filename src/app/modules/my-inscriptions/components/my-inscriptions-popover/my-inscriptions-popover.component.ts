import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'my-inscriptions-popover',
  templateUrl: 'my-inscriptions-popover.component.html',
})
export class MyInscriptionsPopoverComponent {
  constructor(private popoverCtrl: PopoverController) {}

  async onClick(type: string) {
    this.popoverCtrl.dismiss(type);
  }
}

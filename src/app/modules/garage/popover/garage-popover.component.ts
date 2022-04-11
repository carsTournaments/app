import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'garage-popover',
    templateUrl: 'garage-popover.component.html',
})
export class GaragePopoverComponent {
    constructor(private popoverCtrl: PopoverController) {}

    async onClick(type: string) {
        this.popoverCtrl.dismiss(type);
    }
}

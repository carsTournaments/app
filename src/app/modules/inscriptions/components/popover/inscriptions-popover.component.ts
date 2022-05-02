import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'inscriptions-popover',
    templateUrl: 'inscriptions-popover.component.html',
})
export class InscriptionsPopoverComponent {
    constructor(private popoverCtrl: PopoverController) {}

    async onClick(type: string) {
        this.popoverCtrl.dismiss(type);
    }
}

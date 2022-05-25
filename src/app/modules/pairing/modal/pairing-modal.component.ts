import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Car } from '@models';

@Component({
    selector: 'pairing-modal',
    templateUrl: 'pairing-modal.component.html',
    styleUrls: ['./pairing-modal.component.scss'],
})
export class PairingModalComponent {
    @Input() car: Car;
    constructor(private popoverCtrl: PopoverController) {}

    async onClick(type: string) {
        this.popoverCtrl.dismiss(type);
    }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pairing } from '@models';

@Component({
    selector: 'pairing-block-info',
    templateUrl: 'pairing-block-info.component.html',
    styleUrls: ['./pairing-block-info.component.scss'],
})
export class PairingBlockInfoComponent {
    @Input() pairing: Pairing;
    @Output() report = new EventEmitter();
}

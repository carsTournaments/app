import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pairing } from '@models';

@Component({
    selector: 'round-pairings',
    templateUrl: 'round-pairings.component.html',
    styleUrls: ['round-pairings.component.scss'],
})
export class RoundPairingsComponent {
    @Input() pairings: Pairing[];
    @Output() clickItem = new EventEmitter<Pairing>();
}

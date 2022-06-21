import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InscriptionGetAllForDriverItemI } from '@interfaces';

@Component({
    selector: 'inscriptions-state',
    templateUrl: 'inscriptions-state.component.html',
    styleUrls: ['./inscriptions-state.component.scss'],
})
export class InscriptionsStateComponent {
    @Input() title: string;
    @Input() items: InscriptionGetAllForDriverItemI[] = [];
    @Input() type: string;
    @Input() state = false;
    @Output() showOrHide: EventEmitter<string> = new EventEmitter<string>();
    @Output() openPopover: EventEmitter<{
        event: any;
        carId: string;
        tournamentId: string;
    }> = new EventEmitter();
}

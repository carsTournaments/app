import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InscriptionGetAllForDriverItemI } from '@interfaces';

@Component({
    selector: 'my-inscriptions-state',
    templateUrl: 'my-inscriptions-state.component.html',
    styleUrls: ['./my-inscriptions-state.component.scss'],
})
export class MyInscriptionsStateComponent {
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InscriptionGetAllForDriverItemI } from 'src/app/interfaces/inscription.interface';
import { Car, Tournament } from 'src/app/models';

@Component({
    selector: 'inscriptions-state',
    templateUrl: 'inscriptions-state.component.html',
    styleUrls: ['./inscriptions-state.component.scss'],
})
export class InscriptionsStateComponent implements OnInit {
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
    constructor() {}

    ngOnInit() {}
}

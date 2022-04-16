import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/models';
import { InscriptionGetMyCarsUserForInscriptionResponse } from 'src/app/services/api/inscription/inscription.responses';

@Component({
    selector: 'tournament-my-inscriptions',
    templateUrl: 'tournament-my-inscriptions.component.html',
    styleUrls: ['./tournament-my-inscriptions.component.scss'],
})
export class TournamentMyInscriptionsComponent implements OnInit {
    @Input() myCars: InscriptionGetMyCarsUserForInscriptionResponse;
    @Output() confirmDeleteInscriptionClick: EventEmitter<Car> =
        new EventEmitter();

    constructor() {}

    ngOnInit() {}
}

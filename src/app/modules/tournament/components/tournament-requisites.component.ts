import { Component, Input, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models';

@Component({
    selector: 'tournament-requisites',
    templateUrl: 'tournament-requisites.component.html',
    styleUrls: ['./tournament-requisites.component.scss'],
})
export class TournamentRequisitesComponent implements OnInit {
    @Input() tournament: Tournament;
    @Input() buttonInscription: boolean;
    constructor() {}

    ngOnInit() {}
}

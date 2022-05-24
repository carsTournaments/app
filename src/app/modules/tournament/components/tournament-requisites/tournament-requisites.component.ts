import { Component, Input } from '@angular/core';
import { Tournament } from '@models';

@Component({
    selector: 'tournament-requisites',
    templateUrl: 'tournament-requisites.component.html',
    styleUrls: ['./tournament-requisites.component.scss'],
})
export class TournamentRequisitesComponent {
    @Input() tournament: Tournament;
    @Input() buttonInscription: boolean;
}

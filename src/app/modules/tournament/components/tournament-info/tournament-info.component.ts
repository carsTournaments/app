import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tournament } from '@models';

@Component({
    selector: 'tournament-info',
    templateUrl: 'tournament-info.component.html',
    styleUrls: ['./tournament-info.component.scss'],
})
export class TournamentInfoComponent {
    @Input() tournament: Tournament;
    @Input() cols: string;
    @Input() buttonInscription: boolean;
    @Output() inscriptionCarClick: EventEmitter<void> = new EventEmitter();
}

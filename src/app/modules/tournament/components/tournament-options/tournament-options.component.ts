import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tournament } from '@models';

@Component({
    selector: 'tournament-options',
    templateUrl: 'tournament-options.component.html',
    styleUrls: ['./tournament-options.component.scss'],
})
export class TournamentOptionsComponent {
    @Input() tournament: Tournament;
    @Output() clickOption = new EventEmitter<string>();
}

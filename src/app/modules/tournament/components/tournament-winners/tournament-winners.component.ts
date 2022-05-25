import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from '@models';
import { WinnerGetOfTournamentComplete } from '@services/api/winner/winner.responses';

@Component({
    selector: 'tournament-winners',
    templateUrl: 'tournament-winners.component.html',
})
export class TournamentWinnersComponent {
    @Input() winners: WinnerGetOfTournamentComplete;
    @Output() clickItem: EventEmitter<Car> = new EventEmitter<Car>();
}

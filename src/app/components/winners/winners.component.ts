import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/models';
import { WinnerGetOfTournamentComplete } from 'src/app/services/api/winner/winner.responses';

@Component({
    selector: 'winners',
    templateUrl: 'winners.component.html',
})
export class WinnersComponent implements OnInit {
    @Input() winners: WinnerGetOfTournamentComplete;
    @Output() clickItem: EventEmitter<Car> = new EventEmitter<Car>();
    constructor() {}

    ngOnInit() {}
}

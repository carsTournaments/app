import {Component, Input, OnInit} from '@angular/core';
import {WinnerGetOfTournamentComplete} from 'src/app/services/api/winner/winner.responses';

@Component({
    selector: 'winners',
    templateUrl: 'winners.component.html',
})
export class WinnersComponent implements OnInit {
    @Input() winners: WinnerGetOfTournamentComplete;
    constructor() {}

    ngOnInit() {}
}

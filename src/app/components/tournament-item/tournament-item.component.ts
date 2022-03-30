import { Component, Input, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';

@Component({
    selector: 'tournament-item',
    templateUrl: 'tournament-item.component.html',
    styleUrls: ['./tournament-item.component.scss']
})

export class TournamentItemComponent implements OnInit {
    @Input() tournament: Tournament
    constructor() { }

    ngOnInit() { }
}
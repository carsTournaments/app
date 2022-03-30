import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tournament } from 'src/app/models/tournament.model';

@Component({
    selector: 'tournament-item',
    templateUrl: 'tournament-item.component.html',
    styleUrls: ['./tournament-item.component.scss'],
})
export class TournamentItemComponent implements OnInit {
    @Input() tournament: Tournament;
    @Output() clickItem: EventEmitter<Tournament> =
        new EventEmitter<Tournament>();
    constructor() {}

    ngOnInit() {}
}

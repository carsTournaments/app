import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tournament } from 'src/app/models';

@Component({
    selector: 'tournament-info',
    templateUrl: 'tournament-info.component.html',
})
export class TournamentInfoComponent implements OnInit {
    @Input() tournament: Tournament;
    @Input() cols: string;
    @Input() buttonInscription: boolean;
    @Output() inscriptionCarClick: EventEmitter<void> = new EventEmitter();
    constructor() {}

    ngOnInit() {}
}

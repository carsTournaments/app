import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tournament } from 'src/app/models';
import { ImagePipe } from 'src/app/pipes';

@Component({
    selector: 'tournament-item',
    templateUrl: 'tournament-item.component.html',
    styleUrls: ['./tournament-item.component.scss'],
})
export class TournamentItemComponent implements OnInit {
    @Input() tournament: Tournament;
    @Output() clickItem: EventEmitter<Tournament> =
        new EventEmitter<Tournament>();

    constructor(private imagePipe: ImagePipe) {}

    ngOnInit() {
        this.setImageForBackground();
    }

    setImageForBackground() {
        const image = {
            url: this.imagePipe.transform(
                this.tournament.image && this.tournament.image.url
                    ? this.tournament.image.url
                    : null
            ),
        };
        this.tournament.image = image;
    }
}

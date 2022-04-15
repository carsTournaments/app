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
        if (this.tournament.image) {
            this.tournament.image.url = this.imagePipe.transform(
                this.tournament.image.url ?? ''
            );
        } else {
            this.tournament.image = {
                url: 'assets/images/no-image.png',
                name: '',
            };
        }
    }
}

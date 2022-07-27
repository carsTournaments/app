import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image, Tournament } from '@models';
import { ImagePipe } from '@pipes';

@Component({
  selector: 'tournament-item',
  templateUrl: 'tournament-item.component.html',
  styleUrls: ['./tournament-item.component.scss'],
})
export class TournamentItemComponent implements OnInit {
  @Input() tournament: Tournament;
  @Output() clickItem: EventEmitter<Tournament> =
    new EventEmitter<Tournament>();
  image: Image;
  backgroundImage: string;
  @Input() type: 'normal' | 'inscriptions' = 'normal';
  constructor(private imagePipe: ImagePipe) {}

  ngOnInit() {
    this.setImageForBackground();
  }

  setImageForBackground() {
    if (this.tournament) {
      this.image = {
        url: this.imagePipe.transform(
          this.tournament.image && this.tournament.image.url
            ? this.tournament.image.url
            : null
        ),
      };
      this.backgroundImage = `
                linear-gradient(rgba(0, 0, 0, 0.43),
                rgba(0, 0, 0, 0.43)),
                url('${this.image.url}')
            `;
    }
  }
}

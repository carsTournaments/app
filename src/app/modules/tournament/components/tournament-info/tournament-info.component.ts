import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inscription, Tournament } from '@models';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'tournament-info',
  templateUrl: 'tournament-info.component.html',
  styleUrls: ['./tournament-info.component.scss'],
})
export class TournamentInfoComponent {
  @Input() tournament: Tournament;
  @Input() buttonInscription: boolean;
  @Input() inscriptions: Inscription[] = [];
  @Output() inscriptionCarClick: EventEmitter<void> = new EventEmitter();
  cols = '4';
  slideOpts: SwiperOptions = {
    slidesPerView: 6.1,
    spaceBetween: -10,
    navigation: false,
    fadeEffect: {
      crossFade: true,
    },
  };
}

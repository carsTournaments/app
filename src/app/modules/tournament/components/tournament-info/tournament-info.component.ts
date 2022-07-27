import { Component, Input } from '@angular/core';
import { Tournament } from '@models';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'tournament-info',
  templateUrl: 'tournament-info.component.html',
  styleUrls: ['./tournament-info.component.scss'],
})
export class TournamentInfoComponent {
  @Input() tournament: Tournament;
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

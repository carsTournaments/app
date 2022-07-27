import { Tournament } from '@models';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'tournaments-slider',
  templateUrl: 'tournaments-slider.component.html',
  styleUrls: ['./tournaments-slider.component.scss'],
})
export class TournamentsSliderComponent {
  @Input() tournaments: Tournament[] = [];
  @Input() title: string;
  @Output() clickItem: EventEmitter<Tournament> = new EventEmitter();

  slideOpts: SwiperOptions = {
    slidesPerView: 1.1,
    spaceBetween: -10,
    navigation: false,
    zoom: {
      maxRatio: 5,
    },
    fadeEffect: {
      crossFade: true,
    },
  };
}

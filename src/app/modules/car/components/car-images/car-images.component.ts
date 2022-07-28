import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '@env/environment';
import { Image } from '@models';
import { ImageCarPipe } from '@shared/pipes';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'car-images',
  templateUrl: 'car-images.component.html',
  providers: [ImageCarPipe],
})
export class CarImagesComponent {
  @Input() images: Image[];
  @Output() openImage = new EventEmitter<string>();
  image: string;
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
  path = environment.urlImages;
  constructor(private imageCarPipe: ImageCarPipe) {}

  getImage(image: Image): string {
    return this.imageCarPipe.transform([image]);
  }
}

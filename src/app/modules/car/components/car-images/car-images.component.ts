import { Component, Input } from '@angular/core';
import { environment } from '@env/environment';
import { Image } from '@models';
import { AnalyticsService, ImageService } from '@services';
import { ImageCarPipe } from '@shared/pipes';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'car-images',
  templateUrl: 'car-images.component.html',
  providers: [ImageCarPipe],
})
export class CarImagesComponent {
  @Input() images: Image[];
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
  constructor(
    private imageCarPipe: ImageCarPipe,
    private analyticsService: AnalyticsService,
    private imageService: ImageService
  ) {}

  getImage(image: Image): string {
    return this.imageCarPipe.transform([image]);
  }

  openImage(image: string): void {
    this.analyticsService.logEvent('car_openImage');
    this.imageService.openImage(image);
  }
}

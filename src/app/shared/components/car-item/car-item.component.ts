import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car, Image } from '@models';
import { ImageCarPipe } from '@pipes';

@Component({
  selector: 'car-item',
  templateUrl: 'car-item.component.html',
  styleUrls: ['./car-item.component.scss'],
  providers: [ImageCarPipe],
})
export class CarItemComponent implements OnInit {
  @Input() car: Car;
  @Input() type: 'normal' | 'likesReceived' | 'likesSent' | 'topCars' =
    'normal';
  @Input() likesOptions?: {
    likes?: number;
    lastLike?: string;
    created?: string;
  };
  @Output() clickItem: EventEmitter<Car> = new EventEmitter<Car>();
  image: Image;
  backgroundImage: string;
  constructor(private imageCarPipe: ImageCarPipe) {}

  ngOnInit() {
    this.setImageForBackground();
  }

  setImageForBackground() {
    if (this.car) {
      this.image = {
        url: this.imageCarPipe.transform(
          this.car.images && this.car.images.length > 0 ? this.car.images : null
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

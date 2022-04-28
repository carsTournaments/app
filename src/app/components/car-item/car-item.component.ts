import { Image } from './../../models/image.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/models';
import { ImagePipe } from 'src/app/pipes';

@Component({
    selector: 'car-item',
    templateUrl: 'car-item.component.html',
    styleUrls: ['./car-item.component.scss'],
})
export class CarItemComponent implements OnInit {
    @Input() car: Car;
    @Input() type: 'normal' | 'likes' = 'normal';
    @Input() likesOptions: {
        likes: number;
        lastLike: string;
    };
    @Output() clickItem: EventEmitter<Car> = new EventEmitter<Car>();
    image: Image;
    backgroundImage: string;
    constructor(private imagePipe: ImagePipe) {}

    ngOnInit() {
        this.setImageForBackground();
    }

    setImageForBackground() {
        if (this.car) {
            this.image = {
                url: this.imagePipe.transform(
                    this.car.image && this.car.image.url
                        ? this.car.image.url
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

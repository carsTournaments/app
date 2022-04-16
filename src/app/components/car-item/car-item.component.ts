import {Image} from './../../models/image.model';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car} from 'src/app/models';
import {ImagePipe} from 'src/app/pipes';

@Component({
    selector: 'car-item',
    templateUrl: 'car-item.component.html',
    styleUrls: ['./car-item.component.scss'],
})
export class CarItemComponent implements OnInit {
    @Input() car: Car;
    @Input() winner: string;
    @Output() clickItem: EventEmitter<Car> = new EventEmitter<Car>();
    image: Image;
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
        }
    }
}

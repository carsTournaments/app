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
    @Output() clickItem: EventEmitter<Car> = new EventEmitter<Car>();
    constructor(private imagePipe: ImagePipe) {}

    ngOnInit() {
        this.setImageForBackground();
    }

    setImageForBackground() {
        const image = {
            url: this.imagePipe.transform(
                this.car.image && this.car.image.url ? this.car.image.url : null
            ),
        };
        this.car.image = image;
    }
}

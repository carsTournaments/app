import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from 'src/app/models';
import { ImagePipe } from 'src/app/pipes';

@Component({
    selector: 'car-item',
    templateUrl: 'car-item.component.html',
    styleUrls: ['./car-item.component.scss'],
})
export class CarItemComponent {
    @Input() car: Car;
    @Output() clickItem: EventEmitter<Car> = new EventEmitter<Car>();
    constructor(private imagePipe: ImagePipe) {}

    setImageForBackground() {
        if (this.car.image) {
            this.car.image.url = this.imagePipe.transform(
                this.car.image.url ?? ''
            );
        } else {
            this.car.image = {
                url: 'assets/images/no-image.png',
                name: '',
            };
        }
    }
}

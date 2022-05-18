import { Component, Input } from '@angular/core';
import { Car } from 'src/app/models';

@Component({
    selector: 'car-info',
    templateUrl: 'car-info.component.html',
    styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent {
    @Input() car: Car;
    constructor() {}
}

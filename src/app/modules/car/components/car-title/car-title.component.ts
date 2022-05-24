import { Component, Input } from '@angular/core';
import { Car } from '@models';

@Component({
    selector: 'car-title',
    templateUrl: 'car-title.component.html',
    styleUrls: ['./car-title.component.scss'],
})
export class CarTitleComponent {
    @Input() car: Car;
}

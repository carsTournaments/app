import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from 'src/app/models';

@Component({
    selector: 'winner-car-item',
    templateUrl: 'winner-car-item.component.html',
    styleUrls: ['./winner-car-item.component.scss'],
})
export class WinnerCarItemComponent {
    @Input() car: Car;
    @Input() type: 'gold' | 'silver' | 'bronze' = 'gold';
    @Output() clickItem: EventEmitter<Car> = new EventEmitter<Car>();
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/models';

@Component({
    selector: 'winner-car-item',
    templateUrl: 'winner-car-item.component.html',
    styleUrls: ['./winner-car-item.component.scss'],
})
export class WinnerCarItemComponent implements OnInit {
    @Input() car: Car;
    @Input() type: 'gold' | 'silver' | 'bronze' = 'gold';
    @Output() clickItem: EventEmitter<Car> = new EventEmitter<Car>();
    constructor() {}

    ngOnInit() {}
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/models';

@Component({
    selector: 'car-item',
    templateUrl: 'car-item.component.html',
    styleUrls: ['./car-item.component.scss'],
})
export class CarItemComponent implements OnInit {
    @Input() car: Car;
    @Output() clickItem: EventEmitter<Car> = new EventEmitter<Car>();
    constructor() {}

    ngOnInit() {}
}

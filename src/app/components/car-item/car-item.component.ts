import { Car } from './../../models/car.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'car-item',
    templateUrl: 'car-item.component.html',
    styleUrls: ['./car-item.component.scss']
})

export class CarItemComponent implements OnInit {
    @Input() car: Car
    @Output() onClick: EventEmitter<Car>  = new EventEmitter<Car>();
    constructor() { }

    ngOnInit() { }
}
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'car-totals',
    templateUrl: 'car-totals.component.html',
    styleUrls: ['./car-totals.component.scss'],
})
export class CarTotalsComponent implements OnInit {
    @Input() votes: { count: number } = { count: 0 };
    @Input() inscriptions: { count: number } = { count: 0 };
    @Input() likes: { count: number } = { count: 0 };
    @Input() gold: { count: number } = { count: 0 };
    @Input() silver: { count: number } = { count: 0 };
    @Input() bronze: { count: number } = { count: 0 };
    @Output() clickItem: EventEmitter<string> = new EventEmitter<string>();
    constructor() {}

    ngOnInit() {}
}

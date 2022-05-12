import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'car-totals',
    templateUrl: 'car-totals.component.html',
    styleUrls: ['./car-totals.component.scss'],
})
export class CarTotalsComponent implements OnInit {
    @Input() likes: { count: number };
    @Input() votes: { count: number };
    @Input() gold: { count: number };
    @Input() silver: { count: number };
    @Input() bronze: { count: number };
    constructor() {}

    ngOnInit() {}
}

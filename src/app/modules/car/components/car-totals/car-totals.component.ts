import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'car-totals',
    templateUrl: 'car-totals.component.html',
    styleUrls: ['./car-totals.component.scss'],
})
export class CarTotalsComponent implements OnInit {
    @Input() likes: number;
    @Input() winners: {
        gold: number;
        silver: number;
        bronze: number;
    };
    constructor() {}

    ngOnInit() {}
}

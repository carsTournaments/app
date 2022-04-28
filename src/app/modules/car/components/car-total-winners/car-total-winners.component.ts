import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'car-total-winners',
    templateUrl: 'car-total-winners.component.html',
    styleUrls: ['./car-total-winners.component.scss'],
})
export class CarTotalWinnersComponent implements OnInit {
    @Input() winners: {
        gold: number;
        silver: number;
        bronze: number;
    };
    constructor() {}

    ngOnInit() {}
}

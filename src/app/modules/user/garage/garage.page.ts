import { Component, OnInit } from '@angular/core';
import { GarageViewModel } from '..';

@Component({
    selector: 'page-garage',
    templateUrl: 'garage.page.html',
    styleUrls: ['./garage.page.scss'],
})
export class GaragePage implements OnInit {
    vm = new GarageViewModel();
    constructor() {}

    ngOnInit() {}
}

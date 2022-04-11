import { Component, OnInit } from '@angular/core';
import { MyDataViewModel } from './model/my-data.view-model';

@Component({
    selector: 'page-my-data',
    templateUrl: 'my-data.page.html',
    styleUrls: ['./my-data.page.scss'],
})
export class MyDataPage implements OnInit {
    vm = new MyDataViewModel();
    constructor() {}

    ngOnInit() {}
}

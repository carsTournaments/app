import { Component, OnInit } from '@angular/core';
import { InscriptionsViewModel } from '..';

@Component({
    selector: 'page-inscriptions',
    templateUrl: 'inscriptions.page.html',
    styleUrls: ['./inscriptions.page.scss'],
})
export class InscriptionsPage implements OnInit {
    vm = new InscriptionsViewModel();
    constructor() {}

    ngOnInit() {}
}

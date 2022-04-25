import { Component } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
    tabs = [
        {
            name: 'Torneos',
            route: 'tournaments',
            icon: 'list-outline',
        },
        {
            name: 'Coches',
            route: 'cars',
            icon: 'car-outline',
        },
        {
            name: 'Tu cuenta',
            route: 'account',
            icon: 'person-circle-outline',
        },
    ];
    constructor() {}
}

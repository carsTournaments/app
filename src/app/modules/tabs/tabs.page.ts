import { Component } from '@angular/core';
import { AnalyticsService } from '@services';

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
            name: 'Calendario',
            route: 'calendar',
            icon: 'calendar-outline',
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
    constructor(private analyticsService: AnalyticsService) {}

    clickTab(name: string) {
        this.analyticsService.logEvent('tabs_clickTab', {
            params: {
                tab_name: name,
            },
        });
    }
}

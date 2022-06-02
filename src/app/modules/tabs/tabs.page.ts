import { Component, OnInit } from '@angular/core';
import { TogglesService } from '@core/toggles/toggles.service';
import { AnalyticsService } from '@services';
import { TabI } from './../../shared/interfaces/tab.interface';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
    tabs = [];
    constructor(
        private analyticsService: AnalyticsService,
        private togglesService: TogglesService
    ) {}

    ngOnInit() {
        this.generateTabs();
    }

    async generateTabs() {
        this.tabs = [];
        const items: TabI[] = [
            {
                name: 'Torneos',
                route: 'tournaments',
                icon: 'list-outline',
                toggle: 'tab_tournaments',
            },
            {
                name: 'Calendario',
                route: 'calendar',
                icon: 'calendar-outline',
                toggle: 'tab_calendar',
            },
            {
                name: 'Coches',
                route: 'cars',
                icon: 'car-outline',
                toggle: 'tab_cars',
            },
            {
                name: 'Tu cuenta',
                route: 'account',
                icon: 'person-circle-outline',
                toggle: 'tab_account',
            },
        ];

        for (const item of items) {
            if (await this.togglesService.isActiveToggle(item.toggle)) {
                this.tabs.push(item);
            }
        }
    }

    clickTab(name: string) {
        this.analyticsService.logEvent(`tabs_${name}`);
    }
}

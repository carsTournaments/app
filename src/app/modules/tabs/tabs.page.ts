import { Component, OnInit } from '@angular/core';
import { ToggleService } from '@core/services/toggle.service';
import { TabI } from '@interfaces';
import { AnalyticsService } from '@services';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  tabs = [];
  constructor(
    private analyticsService: AnalyticsService,
    private togglesService: ToggleService
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
        icon: 'car-sport-outline',
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

  clickTab(item: TabI) {
    this.analyticsService.logEvent(`tabs_${item.toggle}`);
  }
}

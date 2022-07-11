import { Component, Input } from '@angular/core';
import { CarRankingI } from '@interfaces';
import { AnalyticsService } from '@services';

@Component({
    selector: 'ranking-item',
    templateUrl: 'ranking-item.component.html',
    styleUrls: ['./ranking-item.component.scss'],
})
export class RankingItemComponent {
    @Input() ranking: CarRankingI;
    @Input() itemsOrder: { name: string; value: string }[];
    @Input() i: number;
    constructor(private analyticsService: AnalyticsService) {}

    showOrHideItem(item: CarRankingI) {
        item.state = !item.state;
        item.icon = !item.state ? 'chevron-down' : 'chevron-up';
        this.analyticsService.logEvent(
            `ranking_showOrHide_${item.state ? 'show' : 'hide'}`
        );
    }
}

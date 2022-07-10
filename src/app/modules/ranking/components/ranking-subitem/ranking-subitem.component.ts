import { Component, Input } from '@angular/core';
import { CarRankingI } from '@interfaces';
import { NavController } from '@ionic/angular';
import { AnalyticsService } from '@services';

@Component({
    selector: 'ranking-subitem',
    templateUrl: 'ranking-subitem.component.html',
    styleUrls: ['./ranking-subitem.component.scss'],
})
export class RankingSubitemComponent {
    @Input() ranking: CarRankingI;
    @Input() itemsOrder: { name: string; value: string }[];
    constructor(
        private navCtrl: NavController,
        private analyticsService: AnalyticsService
    ) {}

    goToCar(id: string) {
        this.analyticsService.logEvent(`ranking_goToCar`);
        this.navCtrl.navigateForward(['/car', id]);
    }
}

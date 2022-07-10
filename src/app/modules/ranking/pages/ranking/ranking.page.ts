import { Component } from '@angular/core';
import { AnalyticsService, CarService } from '@services';
import { RankingViewModel } from '../../models/ranking.view-model';

@Component({
    selector: 'page-ranking',
    templateUrl: 'ranking.page.html',
})
export class RankingPage {
    vm = new RankingViewModel();
    constructor(
        private carService: CarService,
        private analyticsService: AnalyticsService
    ) {}

    ionViewWillEnter() {
        this.getRanking();
    }

    getRanking() {
        this.carService.getGlobalRanking(this.vm.bodyRanking).subscribe({
            next: (res) => (this.vm.ranking = res),
        });
    }

    changeOrder() {
        this.analyticsService.logEvent(
            `ranking_changeOrder_${this.vm.bodyRanking.order}`
        );
        this.getRanking();
        this.changeItemsOrder();
    }

    changeItemsOrder() {
        console.log(this.vm.itemsOrder);
        console.log(this.vm.itemsOrderDefault);
        this.vm.itemsOrder = this.vm.itemsOrderDefault;
        let itemToOrder: any;
        this.vm.itemsOrder = this.vm.itemsOrder.filter((item: any) => {
            if (item.value !== this.vm.bodyRanking.order) {
                return item;
            } else {
                itemToOrder = item;
            }
        });
        console.log(itemToOrder);
        this.vm.itemsOrder.unshift(itemToOrder);
        console.log(this.vm.itemsOrder);
    }
}

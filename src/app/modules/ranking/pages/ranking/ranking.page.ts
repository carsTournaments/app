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
  ) { }

  ionViewWillEnter() {
    this.getRanking();
  }

  getRanking(event?: any) {
    this.vm.loading = true;
    this.carService.getGlobalRanking(this.vm.bodyRanking).subscribe({
      next: (res) => {
        this.vm.ranking = res;
        if (event) {
          event.target.complete();
        }
        this.vm.loading = false;
      },
      error: () => {
        this.vm.loading = false;
      }
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
    this.vm.itemsOrder = this.vm.itemsOrderDefault;
    let itemToOrder: any;
    this.vm.itemsOrder = this.vm.itemsOrder.filter((item: any) => {
      if (item.value !== this.vm.bodyRanking.order) {
        return item;
      } else {
        itemToOrder = item;
      }
    });
    this.vm.itemsOrder.unshift(itemToOrder);
  }

  doRefresh(event: any) {
    this.analyticsService.logEvent('tournaments_refresh', {});
    this.getRanking(event);
  }
}

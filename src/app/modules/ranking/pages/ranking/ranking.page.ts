import { Component } from '@angular/core';
import { CarService } from '@services';
import { RankingViewModel } from '../../models/ranking.view-model';

@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.page.html'
})

export class RankingPage {
  vm = new RankingViewModel()
  constructor(private carService: CarService) { }

  ionViewWillEnter() {
    this.getRanking();
  }

  getRanking() {
    this.carService.getGlobalRanking(this.vm.bodyRanking).subscribe({
      next: (res) => this.vm.ranking = res
    })
  }

}

import { TournamentsViewModel } from './model/tournaments.view-model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tournaments',
  templateUrl: 'tournaments.page.html',
  styleUrls: ['tournaments.page.scss']
})
export class TournamentsPage {
  vm = new TournamentsViewModel();

  constructor() {}

  segmentChanged(ev: any) {
    this.vm.segments.selected = Number(ev.detail.value);
  }
}

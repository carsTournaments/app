import { Component } from '@angular/core';
import { CarsViewModel } from './model/cars.view-model';

@Component({
  selector: 'app-cars',
  templateUrl: 'cars.page.html',
  styleUrls: ['cars.page.scss']
})
export class CarsPage {
  vm = new CarsViewModel();

  constructor() {}

  segmentChanged(ev: any) {
    this.vm.segments.selected = Number(ev.detail.value);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarTotalsI } from '@interfaces';

@Component({
  selector: 'car-totals',
  templateUrl: 'car-totals.component.html',
  styleUrls: ['./car-totals.component.scss'],
})
export class CarTotalsComponent {
  @Input() items: CarTotalsI;
  @Input() itemsOrder: { name: string; value: string }[];
  @Output() clickItem: EventEmitter<string> = new EventEmitter<string>();
}

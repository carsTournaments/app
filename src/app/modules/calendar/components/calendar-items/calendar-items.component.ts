import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pairing, Round, Tournament } from '@models';

@Component({
  selector: 'calendar-items',
  templateUrl: 'calendar-items.component.html',
  styleUrls: ['./calendar-items.component.scss'],
})
export class CalendarItemsComponent {
  @Output() clickItem = new EventEmitter<Pairing>();
  @Input() rounds: Round[] = [];
  @Input() tournaments: Tournament[] = [];
}

import { Component, Input } from '@angular/core';
import { Round } from '@models';

@Component({
    selector: 'calendar-items',
    templateUrl: 'calendar-items.component.html',
    styleUrls: ['./calendar-items.component.scss'],
})
export class CalendarItemsComponent {
    @Input() rounds: Round[] = [];
}

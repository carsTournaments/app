import { Component } from '@angular/core';
import { CalendarViewModel } from './calendar.view-model';

@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.page.html',
    styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
    vm = new CalendarViewModel();
    constructor() {}
}

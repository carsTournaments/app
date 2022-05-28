import { Component } from '@angular/core';
import { TournamentService } from '@services';
import { CalendarViewModel } from './calendar.view-model';

@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.page.html',
    styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
    vm = new CalendarViewModel();
    constructor(private tournamentService: TournamentService) {}

    getItems() {
        this.vm.loading = true;
        return this.tournamentService
            .getCalendarItems(this.vm.dateSelected)
            .subscribe({
                next: (response) => {
                    this.vm.rounds = response;
                    this.vm.loading = false;
                },
            });
    }

    onDateSelected(date: string) {
        this.vm.dateSelected = date;
        this.getItems();
    }
}

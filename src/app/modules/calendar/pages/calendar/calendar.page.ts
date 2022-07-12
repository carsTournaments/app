import { Component } from '@angular/core';
import { TournamentService } from '@services';
import { CalendarViewModel } from '../../models/calendar.view-model';

@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.page.html',
})
export class CalendarPage {
    vm = new CalendarViewModel();
    constructor(private tournamentService: TournamentService) {}

    async ionViewWillEnter() {
        this.getDates();
    }

    getDates() {
        this.tournamentService.getDaysForCalendar().subscribe({
            next: (dates) => {
                this.vm.dates = dates;
                if (this.vm.dates.length > 0) {
                    this.vm.dateSelected = this.vm.dates[0];
                    this.getItems();
                } else {
                    this.vm.noDays = true;
                    this.vm.loading = false;
                }
            },
        });
    }

    getItems() {
        this.vm.loading = true;
        return this.tournamentService
            .getCalendarItems(this.vm.dateSelected)
            .subscribe({
                next: (response) => {
                    this.vm.rounds = response.rounds;
                    this.vm.tournaments = response.tournaments;
                    this.vm.loading = false;
                },
            });
    }

    onDateSelected(date: string) {
        this.vm.dateSelected = date;
        this.getItems();
    }
}

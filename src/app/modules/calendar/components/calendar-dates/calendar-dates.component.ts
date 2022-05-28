import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TournamentService } from '@services';
import { SwiperOptions } from 'swiper';

@Component({
    selector: 'calendar-dates',
    templateUrl: 'calendar-dates.component.html',
    styleUrls: ['./calendar-dates.component.scss'],
})
export class CalendarDatesComponent implements OnInit {
    dates: string[] = [];
    @Input() dateSelected = '';
    slideOpts: SwiperOptions = {
        slidesPerView: 4.1,
        spaceBetween: -10,
        navigation: false,
        fadeEffect: {
            crossFade: true,
        },
    };
    @Output() dateSelectedEvent = new EventEmitter<string>();
    constructor(private tournamentService: TournamentService) {}

    ngOnInit(): void {
        this.getDates();
    }

    getDates() {
        this.tournamentService.getDaysForCalendar().subscribe({
            next: (res) => {
                this.dates = res;
                this.dateSelected = this.dates[0];
                this.dateSelectedEvent.emit(this.dateSelected);
            },
        });
    }

    goToDate(date: string) {
        this.dateSelected = date;
        this.dateSelectedEvent.emit(date);
    }
}

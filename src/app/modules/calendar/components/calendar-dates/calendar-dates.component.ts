import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
    selector: 'calendar-dates',
    templateUrl: 'calendar-dates.component.html',
    styleUrls: ['./calendar-dates.component.scss'],
})
export class CalendarDatesComponent {
    @Input() dates: string[] = [];
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

    goToDate(date: string) {
        this.dateSelected = date;
        this.dateSelectedEvent.emit(date);
    }
}

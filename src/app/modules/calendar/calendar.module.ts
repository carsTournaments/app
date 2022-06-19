import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CalendarPage } from './calendar.page';
import { CalendarDatesComponent } from './components/calendar-dates/calendar-dates.component';
import { CalendarItemsComponent } from './components/calendar-items/calendar-items.component';
import { CalendarItemTournamentComponent } from './components/calendar-item-tournament/calendar-item-tournament.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([{ path: '', component: CalendarPage }]),
    ],
    declarations: [
        CalendarPage,
        CalendarDatesComponent,
        CalendarItemsComponent,
        CalendarItemTournamentComponent,
    ],
})
export class CalendarModule {}

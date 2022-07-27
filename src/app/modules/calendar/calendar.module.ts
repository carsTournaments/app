import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CalendarDatesComponent } from './components/calendar-dates/calendar-dates.component';
import { CalendarItemsComponent } from './components/calendar-items/calendar-items.component';
import { CalendarItemTournamentComponent } from './components/calendar-item-tournament/calendar-item-tournament.component';
import { CalendarPage } from './pages/calendar/calendar.page';

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

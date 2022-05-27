import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CalendarPage } from './calendar.page';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([{ path: '', component: CalendarPage }]),
    ],
    declarations: [CalendarPage],
})
export class CalendarModule {}

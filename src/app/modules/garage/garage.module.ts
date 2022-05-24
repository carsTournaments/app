import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GarageOnePage } from './one/garage-one.page';
import { GarageListPage } from './list/garage-list.page';
import { GaragePopoverComponent } from './popover/garage-popover.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: GarageListPage },
            { path: 'one/:id', component: GarageOnePage },
            { path: 'create', component: GarageOnePage },
        ]),
    ],
    declarations: [GarageListPage, GarageOnePage, GaragePopoverComponent],
})
export class GarageModule {}

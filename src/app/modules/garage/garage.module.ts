import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GarageOnePage } from './pages/one/garage-one.page';
import { GarageListPage } from './pages/list/garage-list.page';
import { SharedModule } from '@shared/shared.module';
import { GaragePopoverComponent } from './components/popover/garage-popover.component';

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

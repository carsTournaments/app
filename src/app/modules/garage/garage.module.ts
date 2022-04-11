import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicesModule } from 'src/app/services/services.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { GarageOnePage } from './one/garage-one.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { GarageListPage } from './list/garage-list.page';
import { GaragePopoverComponent } from './popover/garage-popover.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ComponentsModule,
        ServicesModule,
        PipesModule,
        RouterModule.forChild([
            { path: '', component: GarageListPage },
            { path: 'one/:id', component: GarageOnePage },
            { path: 'create', component: GarageOnePage },
        ]),
    ],
    declarations: [GarageListPage, GarageOnePage, GaragePopoverComponent],
})
export class GarageModule {}

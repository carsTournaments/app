import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarsListPage } from './list/cars-list.page';
import { ServicesModule } from 'src/app/services/services.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { CarsOnePage } from './one/cars-one.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ServicesModule,
        ComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: CarsListPage,
            },
            {
                path: ':id',
                component: CarsOnePage
            }
        ]),
    ],
    declarations: [CarsListPage, CarsOnePage],
})
export class CarsPageModule {}

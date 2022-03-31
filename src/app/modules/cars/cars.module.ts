import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule, ServicesModule } from 'src/app';
import { CarsListPage, CarsOnePage } from '.';
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

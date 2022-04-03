import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule, ServicesModule, PipesModule } from 'src/app';
import { CarsListPage, CarsOnePage } from '.';
import { ImagePipe } from 'src/app/pipes';
@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ServicesModule,
        ComponentsModule,
        PipesModule,
        RouterModule.forChild([
            {
                path: '',
                component: CarsListPage,
            },
            {
                path: 'one/:id',
                component: CarsOnePage
            }
        ]),
    ],
    declarations: [CarsListPage, CarsOnePage],
    providers: [ImagePipe]
})
export class CarsPageModule {}

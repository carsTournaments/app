import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule, ServicesModule, PipesModule } from 'src/app';
import { ImagePipe } from 'src/app/pipes';
import { CarsPage } from './list/cars.page';
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
                component: CarsPage,
            },
        ]),
    ],
    declarations: [CarsPage],
    providers: [ImagePipe],
})
export class CarsPageModule {}

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule, ServicesModule, PipesModule } from 'src/app';
import { ImagePipe } from 'src/app/pipes';
import { CarPage } from './car.page';
import { CarTotalsComponent } from './components/car-totals/car-totals.component';
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
                component: CarPage,
            },
        ]),
    ],
    declarations: [CarPage, CarTotalsComponent],
    providers: [ImagePipe],
})
export class CarModule {}

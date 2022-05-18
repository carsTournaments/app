import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule, ServicesModule, PipesModule } from 'src/app';
import { ImagePipe } from 'src/app/pipes';
import { CarPage } from './car.page';
import { CarTotalsComponent } from './components/car-totals/car-totals.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarTotalsDivsComponent } from './components/car-totals-divs/car-totals-divs.component';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { CarTitleComponent } from './components/car-title/car-title.component';
@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ServicesModule,
        ComponentsModule,
        PipesModule,
        FontAwesomeModule,
        RouterModule.forChild([
            {
                path: '',
                component: CarPage,
            },
        ]),
    ],
    declarations: [
        CarPage,
        CarTitleComponent,
        CarInfoComponent,
        CarTotalsComponent,
        CarTotalsDivsComponent,
    ],
    providers: [ImagePipe],
})
export class CarModule {}

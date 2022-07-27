import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ImagePipe } from '@pipes';
import { CarTotalsComponent } from './components/car-totals/car-totals.component';
import { CarTotalsDivsComponent } from './components/car-totals-divs/car-totals-divs.component';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { CarDriverComponent } from './components/car-drive/car-driver.component';
import { SharedModule } from '@shared/shared.module';
import { CarPage } from './pages/car/car.page';
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CarPage,
      },
    ]),
  ],
  declarations: [
    CarPage,
    CarDriverComponent,
    CarInfoComponent,
    CarTotalsComponent,
    CarTotalsDivsComponent,
  ],
  providers: [ImagePipe],
})
export class CarModule {}

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ImagePipe } from '@pipes';
import { SharedModule } from '@shared/shared.module';
import { CarsPage } from './pages/cars/cars.page';
@NgModule({
  imports: [
    SharedModule,
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
export class CarsModule {}

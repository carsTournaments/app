import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarsPage } from './cars.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CarsPage,
      }
    ])
  ],
  declarations: [CarsPage]
})
export class CarsPageModule {}

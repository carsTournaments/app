import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TournamentsPage } from './tournaments.page';
import { RouterModule } from '@angular/router';
import { ServicesModule } from 'src/app/services/services.module';
import { ComponentsModule } from 'src/app/components/components.module';

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
        component: TournamentsPage,
      }
    ])
  ],
  declarations: [TournamentsPage]
})
export class TournamentsModule {}

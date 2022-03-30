import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPage } from './tabs.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabsPage,
        children: [
          {
            path: 'tournaments',
            loadChildren: () => import('../tournaments/tournaments.module').then(m => m.TournamentsModule)
          },
          {
            path: 'cars',
            loadChildren: () => import('../cars/cars.module').then(m => m.CarsPageModule)
          },
          {
            path: 'account',
            loadChildren: () => import('../account/account.module').then(m => m.Tab3PageModule)
          },
          {
            path: '',
            redirectTo: '/tab/tournaments',
            pathMatch: 'full'
          }
        ]
      },
    ])
  ],
  declarations: [TabsPage]
})
export class TabsModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MyTrophiesItemTrophyComponent } from './components/my-trophies-item-trophy/my-trophies-item-trophy.component';
import { MyTrophiesItemComponent } from './components/my-trophies-item/my-trophies-item.component';
import { MyTrophiesPage } from './page/my-trophies.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MyTrophiesPage,
      },
    ]),
  ],
  declarations: [
    MyTrophiesPage,
    MyTrophiesItemComponent,
    MyTrophiesItemTrophyComponent,
  ],
})
export class MyTrophiesModule {}

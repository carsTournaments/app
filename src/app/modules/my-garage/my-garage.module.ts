import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyGarageListPage } from './pages/garage-list/my-garage-list.page';
import { SharedModule } from '@shared/shared.module';
import { MyGarageImagesPage } from './pages/images/my-garage-images.page';
import { MyGarageOnePage } from './pages/garage-one/my-garage-one.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: MyGarageListPage },
      { path: 'one/:id', component: MyGarageOnePage },
      { path: 'create', component: MyGarageOnePage },
      { path: 'images/:id', component: MyGarageImagesPage },
    ]),
  ],
  declarations: [MyGarageListPage, MyGarageOnePage, MyGarageImagesPage],
})
export class MyGarageModule {}

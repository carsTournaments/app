import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyGarageListPage } from './pages/garage-list/my-garage-list.page';
import { SharedModule } from '@shared/shared.module';
import { MyGaragePopoverComponent } from './components/popover-garage/my-garage-popover.component';
import { MyGarageImagesPage } from './pages/images/my-garage-images.page';
import { MyGarageOnePage } from './pages/garage-one/my-garage-one.page';
import { MyGarageImagePopoverComponent } from './components/popover-image/my-garage-image-popover.component';

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
  declarations: [
    MyGarageListPage,
    MyGarageOnePage,
    MyGarageImagesPage,
    MyGaragePopoverComponent,
    MyGarageImagePopoverComponent,
  ],
})
export class MyGarageModule {}

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyGarageOnePage } from './pages/one/my-garage-one.page';
import { MyGarageListPage } from './pages/list/my-garage-list.page';
import { SharedModule } from '@shared/shared.module';
import { GaragePopoverComponent } from './components/popover/garage-popover.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: MyGarageListPage },
      { path: 'one/:id', component: MyGarageOnePage },
      { path: 'create', component: MyGarageOnePage },
    ]),
  ],
  declarations: [MyGarageListPage, MyGarageOnePage, GaragePopoverComponent],
})
export class MyGarageModule {}

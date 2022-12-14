import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyInscriptionsItemComponent } from './components/inscriptions-item/my-inscriptions-item.component';
import { MyInscriptionsStateComponent } from './components/my-inscriptions-state/my-inscriptions-state.component';
import { SharedModule } from '@shared/shared.module';
import { MyInscriptionsPage } from './pages/inscriptions/my-inscriptions.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: MyInscriptionsPage }]),
  ],
  declarations: [
    MyInscriptionsPage,
    MyInscriptionsStateComponent,
    MyInscriptionsItemComponent,
  ],
})
export class MyInscriptionsModule {}

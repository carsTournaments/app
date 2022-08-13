import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutPage } from './page/about.page';

@NgModule({
  imports: [
    SharedModule,
    FontAwesomeModule,
    RouterModule.forChild([{ path: '', component: AboutPage }]),
  ],
  declarations: [AboutPage],
})
export class AboutModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePipe } from '@pipes';
import { TournamentsPage } from './tournaments.page';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TournamentsPage,
      },
    ]),
  ],
  declarations: [TournamentsPage],
  providers: [ImagePipe],
})
export class TournamentsModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePipe } from '@pipes';
import { SharedModule } from '@shared/shared.module';
import { RankingPage } from './pages/ranking/ranking.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: RankingPage,
      },
    ]),
  ],
  declarations: [RankingPage],
  providers: [ImagePipe],
})
export class RankingModule { }

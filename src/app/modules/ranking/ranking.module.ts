import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePipe } from '@pipes';
import { SharedModule } from '@shared/shared.module';
import { RankingItemComponent } from './components/ranking-item/ranking-item.component';
import { RankingSubitemComponent } from './components/ranking-subitem/ranking-subitem.component';
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
  declarations: [RankingPage, RankingItemComponent, RankingSubitemComponent],
  providers: [ImagePipe],
})
export class RankingModule {}

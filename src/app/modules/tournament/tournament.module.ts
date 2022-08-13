import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePipe } from '@pipes';
import { TournamentPage } from './pages/tournament/tournament.page';
import { TournamentInfoComponent } from './components/tournament-info/tournament-info.component';
import { TournamentRequisitesComponent } from './components/tournament-requisites/tournament-requisites.component';
import { TournamentMyCarsomponent } from './components/tournament-my-cars/tournament-my-cars.component';
import { TournamentWinnersComponent } from './components/tournament-winners/tournament-winners.component';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { TournamentOptionsComponent } from './components/tournament-options/tournament-options.component';

@NgModule({
  imports: [
    SharedModule,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: TournamentPage }]),
  ],
  declarations: [
    TournamentPage,
    TournamentRequisitesComponent,
    TournamentInfoComponent,
    TournamentMyCarsomponent,
    TournamentWinnersComponent,
    TournamentOptionsComponent,
  ],
  providers: [ImagePipe],
})
export class TournamentModule {}

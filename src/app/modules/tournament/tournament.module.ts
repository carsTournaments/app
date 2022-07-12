import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePipe } from '@pipes';
import { TournamentPage } from './pages/tournament/tournament.page';
import { TournamentInfoComponent } from './components/tournament-info/tournament-info.component';
import { TournamentRequisitesComponent } from './components/tournament-requisites/tournament-requisites.component';
import { TournamentMyInscriptionsComponent } from './components/tournament-my-inscriptions/tournament-my-inscriptions.component';
import { TournamentWinnersComponent } from './components/tournament-winners/tournament-winners.component';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

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
        TournamentMyInscriptionsComponent,
        TournamentWinnersComponent,
    ],
    providers: [ImagePipe],
})
export class TournamentModule {}

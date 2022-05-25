import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagePipe } from '@pipes';
import { TournamentPage } from './tournament.page';
import { TournamentInfoComponent } from './components/tournament-info/tournament-info.component';
import { TournamentRequisitesComponent } from './components/tournament-requisites/tournament-requisites.component';
import { TournamentMyInscriptionsComponent } from './components/tournament-my-inscriptions/tournament-my-inscriptions.component';
import { TournamentRoundsComponent } from './components/tournament-rounds/tournament-rounds.component';
import { TournamentWinnersComponent } from './components/tournament-winners/tournament-winners.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: TournamentPage,
            },
        ]),
    ],
    declarations: [
        TournamentPage,
        TournamentRequisitesComponent,
        TournamentInfoComponent,
        TournamentMyInscriptionsComponent,
        TournamentRoundsComponent,
        TournamentWinnersComponent,
    ],
    providers: [ImagePipe],
})
export class TournamentModule {}

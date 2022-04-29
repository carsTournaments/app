import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule, PipesModule, ServicesModule } from 'src/app';
import { ImagePipe } from 'src/app/pipes';
import { TournamentPage } from './tournament.page';
import { TournamentInfoComponent } from './components/tournament-info/tournament-info.component';
import { TournamentRequisitesComponent } from './components/tournament-requisites/tournament-requisites.component';
import { TournamentMyInscriptionsComponent } from './components/tournament-my-inscriptions/tournament-my-inscriptions.component';
import { TournamentRoundsComponent } from './components/tournament-rounds/tournament-rounds.component';
import { TournamentWinnersComponent } from './components/tournament-winners/tournament-winners.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ServicesModule,
        ComponentsModule,
        PipesModule,
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

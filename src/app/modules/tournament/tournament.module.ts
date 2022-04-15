import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule, PipesModule, ServicesModule } from 'src/app';
import { ImagePipe } from 'src/app/pipes';
import { TournamentPage } from './tournament.page';
import { TournamentRequisitesComponent } from './components/tournament-requisites.component';

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
    declarations: [TournamentPage, TournamentRequisitesComponent],
    providers: [ImagePipe],
})
export class TournamentModule {}

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TournamentsListPage } from './list/tournaments-list.page';
import { RouterModule } from '@angular/router';
import { ServicesModule } from 'src/app/services/services.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { TournamentsOnePage } from './one/tournaments-one.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

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
                component: TournamentsListPage,
            },
            {
                path: 'one/:id',
                component: TournamentsOnePage
            }
        ]),
    ],
    declarations: [TournamentsListPage, TournamentsOnePage],
})
export class TournamentsModule {}

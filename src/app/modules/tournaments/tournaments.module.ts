import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TournamentsListPage, TournamentsOnePage } from '.';
import { ComponentsModule, PipesModule, ServicesModule } from 'src/app';
import { ImagePipe } from 'src/app/pipes';

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
                component: TournamentsOnePage,
            },
        ]),
    ],
    declarations: [TournamentsListPage, TournamentsOnePage],
    providers: [ImagePipe],
})
export class TournamentsModule {}

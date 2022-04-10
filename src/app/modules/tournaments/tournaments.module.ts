import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PairingPage, TournamentsListPage, TournamentsOnePage } from '.';
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
        ]),
    ],
    declarations: [TournamentsListPage, TournamentsOnePage, PairingPage],
    providers: [ImagePipe],
})
export class TournamentsModule {}

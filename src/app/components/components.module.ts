import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesModule } from './../services/services.module';
import { TournamentItemComponent } from './tournament-item/tournament-item.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        CommonModule,
        ServicesModule,
        PipesModule
    ],
    declarations: [
        TournamentItemComponent,
    ],
    exports: [
        TournamentItemComponent,
    ],
    providers: [],
})
export class ComponentsModule { }

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesModule } from './../services/services.module';
import { TournamentItemComponent } from './tournament-item/tournament-item.component';
import { PipesModule } from '../pipes/pipes.module';
import { CarItemComponent } from './car-item/car-item.component';
import { BrandItemComponent } from './brand-item/brand-item.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RoundsComponent } from './rounds/rounds.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        IonicModule,
        RouterModule,
        FormsModule,
        CommonModule,
        ServicesModule,
        PipesModule,
    ],
    declarations: [
        BrandItemComponent,
        CarItemComponent,
        HeaderComponent,
        LoginComponent,
        RoundsComponent,
        TournamentItemComponent,
    ],
    exports: [
        BrandItemComponent,
        CarItemComponent,
        HeaderComponent,
        LoginComponent,
        RoundsComponent,
        TournamentItemComponent,
    ],
    providers: [],
})
export class ComponentsModule {}

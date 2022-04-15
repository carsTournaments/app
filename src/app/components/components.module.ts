import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesModule } from './../services/services.module';
import { TournamentItemComponent } from './tournament-item/tournament-item.component';
import { PipesModule } from '../pipes/pipes.module';
import { CarItemComponent } from './car-item/car-item.component';
import { BrandItemComponent } from './brand-item/brand-item.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { RoundsComponent } from './rounds/rounds.component';
import { IonicModule } from '@ionic/angular';
import { CountUpDirective } from '../directives/count-up/count-up.directive';
import { TournamentsSliderComponent } from './tournaments-slider/tournaments-slider.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
    imports: [
        IonicModule,
        RouterModule,
        FormsModule,
        CommonModule,
        ServicesModule,
        PipesModule,
        SwiperModule,
    ],
    declarations: [
        CountUpDirective,
        BrandItemComponent,
        CarItemComponent,
        HeaderComponent,
        AuthComponent,
        RoundsComponent,
        TournamentItemComponent,
        TournamentsSliderComponent,
    ],
    exports: [
        CountUpDirective,
        BrandItemComponent,
        CarItemComponent,
        HeaderComponent,
        AuthComponent,
        RoundsComponent,
        TournamentItemComponent,
        TournamentsSliderComponent,
    ],
    providers: [],
})
export class ComponentsModule {}

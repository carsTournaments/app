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
import { IonicModule } from '@ionic/angular';
import { CountUpDirective } from '../directives/count-up/count-up.directive';
import { SwiperModule } from 'swiper/angular';
import { SpinnerComponent } from './spinner/spinner.component';
import { TournamentsSliderComponent } from './tournaments-slider/tournaments-slider.component';
import { ViewerComponent } from './viewer/viewer.component';
import { WinnerCarItemComponent } from './winner-car-item/winner-car-item.component';
import { CanYouHelpComponent } from './can-you-help/can-you-help.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
        RouterModule,
        ServicesModule,
        SwiperModule,
    ],
    declarations: [
        AuthComponent,
        BrandItemComponent,
        CanYouHelpComponent,
        CarItemComponent,
        CountUpDirective,
        HeaderComponent,
        SpinnerComponent,
        TournamentItemComponent,
        TournamentsSliderComponent,
        ViewerComponent,
        WinnerCarItemComponent,
    ],
    exports: [
        AuthComponent,
        BrandItemComponent,
        CanYouHelpComponent,
        CarItemComponent,
        CountUpDirective,
        HeaderComponent,
        SpinnerComponent,
        TournamentItemComponent,
        TournamentsSliderComponent,
        ViewerComponent,
        WinnerCarItemComponent,
    ],
    providers: [],
})
export class ComponentsModule {}

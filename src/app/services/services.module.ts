import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GlobalHttpInterceptor } from '../core/interceptors/global-http.interceptor';
import { BrandService } from './brand/brand.service';
import { CarService } from './car/car.service';
import { TournamentService } from './tournament/tournament.service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    declarations: [],
    providers: [
        BrandService,
        CarService,
        TournamentService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalHttpInterceptor,
            multi: true,
        },
    ],
})
export class ServicesModule { }

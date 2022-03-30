import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GlobalHttpInterceptor } from '../core/interceptors/global-http.interceptor';
import { AuthService } from './api/auth/auth.service';
import { BrandService } from './api/brand/brand.service';
import { CarService } from './api/car/car.service';
import { TournamentService } from './api/tournament/tournament.service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    declarations: [],
    providers: [
        AuthService,
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

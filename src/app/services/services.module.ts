import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import {
    AuthService,
    BrandService,
    CarService,
    InscriptionService,
    RoundService,
    TournamentService,
    ActionSheetService,
    AlertService,
    StorageService
} from '.';
import { GlobalHttpInterceptor } from '../core/interceptors/global-http.interceptor';


@NgModule({
    imports: [CommonModule, HttpClientModule, IonicStorageModule.forRoot()],
    declarations: [],
    providers: [
        // Api
        AuthService,
        BrandService,
        CarService,
        InscriptionService,
        RoundService,
        TournamentService,
        // Ionic
        ActionSheetService,
        AlertService,
        StorageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalHttpInterceptor,
            multi: true,
        },
    ],
})
export class ServicesModule { }

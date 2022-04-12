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
    StorageService,
    PairingService,
    VoteService,
} from '.';
import { TokenInterceptorService } from '../core/interceptors/token.interceptor';

@NgModule({
    imports: [CommonModule, HttpClientModule, IonicStorageModule.forRoot()],
    declarations: [],
    providers: [
        // Api
        AuthService,
        BrandService,
        CarService,
        InscriptionService,
        PairingService,
        RoundService,
        TournamentService,
        VoteService,
        // Ionic
        ActionSheetService,
        AlertService,
        StorageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
    ],
})
export class ServicesModule {}

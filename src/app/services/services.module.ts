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
    UserService,
    SpinnerHandlerService,
    WinnerService,
    LikeService,
} from '.';
import { HttpInterceptorService } from '../core/interceptors/http.interceptor';
import { ImageService } from './api/image/image.service';

@NgModule({
    imports: [CommonModule, HttpClientModule, IonicStorageModule.forRoot()],
    declarations: [],
    providers: [
        // Api
        AuthService,
        BrandService,
        CarService,
        ImageService,
        InscriptionService,
        LikeService,
        PairingService,
        RoundService,
        TournamentService,
        UserService,
        VoteService,
        WinnerService,
        // Ionic
        ActionSheetService,
        AlertService,
        StorageService,
        SpinnerHandlerService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
        },
    ],
})
export class ServicesModule {}

import { CommonModule, Location } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import {
    ActionSheetService,
    AlertService,
    AuthService,
    BrandService,
    CarService,
    InscriptionService,
    LikeService,
    PairingService,
    RoundService,
    SettingsService,
    SpinnerHandlerService,
    StorageService,
    TournamentService,
    UserService,
    UtilsService,
    VoteService,
    WinnerService,
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
        SettingsService,
        TournamentService,
        UserService,
        VoteService,
        WinnerService,
        // Ionic
        ActionSheetService,
        AlertService,
        StorageService,
        SpinnerHandlerService,
        // Various
        UtilsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
        },
    ],
})
export class ServicesModule {}

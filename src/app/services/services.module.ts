import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import {
    ActionSheetService,
    AdmobService,
    AlertService,
    AnalyticsService,
    AuthService,
    BrandService,
    CarService,
    ImageService,
    InscriptionService,
    LikeService,
    PairingService,
    ReportService,
    RoundService,
    SettingsService,
    StorageService,
    TournamentService,
    UserService,
    UtilsService,
    VoteService,
    WinnerService,
} from '.';
import { HttpInterceptorService } from '../core/interceptors/http.interceptor';

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
        ReportService,
        RoundService,
        SettingsService,
        TournamentService,
        UserService,
        VoteService,
        WinnerService,
        // Capacitor
        AdmobService,
        AnalyticsService,
        // Ionic
        ActionSheetService,
        AlertService,
        StorageService,
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

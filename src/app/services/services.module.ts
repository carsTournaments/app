import { AlertService } from './ionic/alert.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GlobalHttpInterceptor } from '../core/interceptors/global-http.interceptor';
import { AuthService } from './api/auth/auth.service';
import { BrandService } from './api/brand/brand.service';
import { CarService } from './api/car/car.service';
import { TournamentService } from './api/tournament/tournament.service';
import { ActionSheetService } from './ionic/action-sheet.service';
import { StorageService } from './ionic/storage.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { RoundService } from './api/round/round.service';

@NgModule({
    imports: [CommonModule, HttpClientModule, IonicStorageModule.forRoot()],
    declarations: [],
    providers: [
        // Api
        AuthService,
        BrandService,
        CarService,
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
export class ServicesModule {}

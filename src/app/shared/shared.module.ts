import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    BannerRankingComponent,
    BrandItemComponent,
    CanYouHelpComponent,
    CarAddComponent,
    CarItemComponent,
    HeaderComponent,
    HeaderSubComponent,
    NoItemsComponent,
    ReportModalComponent,
    SpinnerComponent,
    TournamentItemComponent,
    TournamentsSliderComponent,
    ViewerComponent,
    WinnerCarItemComponent,
} from '@components';
import { AuthGuard } from '@core/guards/auth.guard';
import {
    BASE_URL,
    IMAGES_URL,
    httpInterceptorProviders,
} from '@core/interceptors';
import { environment } from '@env/environment';
import {
    FaIconLibrary,
    FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import {
    ActionSheetIonicService,
    AdmobService,
    AlertService,
    AnalyticsService,
    AuthService,
    BrandService,
    CarService,
    GoogleAuthService,
    ImageService,
    InscriptionService,
    LikeService,
    NotificationsPushService,
    PairingService,
    ReportService,
    RoundService,
    SettingsService,
    SocialSharingService,
    StorageService,
    ToastIonicService,
    TournamentService,
    UserService,
    UtilsService,
    VoteService,
    WinnerService,
} from '@services';
import { SwiperModule } from 'swiper/angular';
import { CountUpDirective } from './directives/count-up/count-up.directive';
import {
    ImagePipe,
    DateToTimeAgoPipe,
    LastRoundPipe,
    MomentFormatAgoPipe,
    TruncateTextPipe,
    FirstLetterPipe,
    DateToDayOrMonthPipe,
    PercentagePipe,
    FlagByFilePipe,
    VotesPipe,
    MomentDateShortPipe,
    FuelPipe,
    CountryByValue,
} from './pipes';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { ToggleService } from '@core/services/toggle.service';
import { AdsenseModule } from 'ng2-adsense';
import { TranslateModule } from '@ngx-translate/core';

const MODULES = [
    IonicModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    IonicStorageModule,
    SwiperModule,
    FontAwesomeModule,
    AdsenseModule,
    TranslateModule,
];
const COMPONENTS = [
    BannerRankingComponent,
    BrandItemComponent,
    CanYouHelpComponent,
    CarAddComponent,
    CarItemComponent,
    CountUpDirective,
    HeaderComponent,
    HeaderSubComponent,
    NoItemsComponent,
    ReportModalComponent,
    SpinnerComponent,
    TournamentItemComponent,
    TournamentsSliderComponent,
    ViewerComponent,
    WinnerCarItemComponent,
];
const PIPES = [
    CountryByValue,
    DateToDayOrMonthPipe,
    DateToTimeAgoPipe,
    FirstLetterPipe,
    FlagByFilePipe,
    FuelPipe,
    ImagePipe,
    LastRoundPipe,
    MomentDateShortPipe,
    MomentFormatAgoPipe,
    PercentagePipe,
    TruncateTextPipe,
    VotesPipe,
];
const DIRECTIVES = [CountUpDirective];
const SERVICES = [
    ActionSheetIonicService,
    AdmobService,
    AlertService,
    AnalyticsService,
    AuthGuard,
    AuthService,
    BrandService,
    CarService,
    ImageService,
    InscriptionService,
    NotificationsPushService,
    PairingService,
    ReportService,
    RoundService,
    SettingsService,
    StorageService,
    ToastIonicService,
    ToggleService,
    TournamentService,
    UserService,
    UtilsService,
    VoteService,
    WinnerService,
    GoogleAuthService,
    LikeService,
    SocialSharingService,
];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
    declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
    providers: [
        ...SERVICES,
        { provide: BASE_URL, useValue: environment.urlApi },
        { provide: IMAGES_URL, useValue: environment.urlApi },
        httpInterceptorProviders,
    ],
})
export class SharedModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, far);
    }
}

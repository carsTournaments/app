import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    BrandItemComponent,
    CanYouHelpComponent,
    CarItemComponent,
    HeaderComponent,
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
} from './pipes';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { TogglesService } from '@core/toggles/toggles.service';

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
];
const COMPONENTS = [
    BrandItemComponent,
    CanYouHelpComponent,
    CarItemComponent,
    CountUpDirective,
    HeaderComponent,
    NoItemsComponent,
    ReportModalComponent,
    SpinnerComponent,
    TournamentItemComponent,
    TournamentsSliderComponent,
    ViewerComponent,
    WinnerCarItemComponent,
];
const PIPES = [
    DateToDayOrMonthPipe,
    DateToTimeAgoPipe,
    FirstLetterPipe,
    FlagByFilePipe,
    ImagePipe,
    LastRoundPipe,
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
    TogglesService,
    TournamentService,
    UserService,
    UtilsService,
    VoteService,
    WinnerService,
    GoogleAuthService,
    LikeService,
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

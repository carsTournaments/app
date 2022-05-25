import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
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
    NotificationsPushService,
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
} from './pipes';

const MODULES = [
    CommonModule,
    IonicModule,
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
    ImagePipe,
    DateToTimeAgoPipe,
    LastRoundPipe,
    MomentFormatAgoPipe,
    TruncateTextPipe,
    FirstLetterPipe,
];
const DIRECTIVES = [CountUpDirective];
const SERVICES = [
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
    NotificationsPushService,
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
];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
    declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
    providers: [...SERVICES],
})
export class SharedModule {}

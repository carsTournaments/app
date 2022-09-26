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
import { httpInterceptorProviders } from '@core/interceptors';
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
  AppUpdateService,
  AuthService,
  BrandService,
  CarService,
  FirebaseAuthenticationService,
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
  CountryByValue,
  DateToDayOrMonthPipe,
  DateToTimeAgoPipe,
  FirstLetterPipe,
  FlagByFilePipe,
  FuelPipe,
  ImageCarPipe,
  ImagePipe,
  LastRoundPipe,
  MomentDateShortPipe,
  MomentFormatAgoPipe,
  PercentagePipe,
  TractionPipe,
  TruncateTextPipe,
  VotesPipe,
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
  ImageCarPipe,
  LastRoundPipe,
  MomentDateShortPipe,
  MomentFormatAgoPipe,
  PercentagePipe,
  TractionPipe,
  TruncateTextPipe,
  VotesPipe,
];
const DIRECTIVES = [CountUpDirective];
const SERVICES = [
  ActionSheetIonicService,
  AdmobService,
  AlertService,
  AnalyticsService,
  AppUpdateService,
  AuthGuard,
  AuthService,
  BrandService,
  CarService,
  FirebaseAuthenticationService,
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
  ToggleService,
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
  providers: [...SERVICES, httpInterceptorProviders],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}

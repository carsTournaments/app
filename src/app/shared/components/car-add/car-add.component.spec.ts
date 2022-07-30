import { Tournament } from '@models';
import {
  ComponentFixture,
  getTestBed,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImagePipe } from '@pipes';
import { SharedModule } from '@shared/shared.module';
import { CarAddComponent } from './car-add.component';
import {
  AlertService,
  AnalyticsService,
  BrandService,
  CarService,
  ImageService,
  ToastIonicService,
} from '@services';
import {
  alertService,
  analyticsService,
  brandService,
  carService,
  imageService,
  toastIonicService,
  translateService,
} from '@services/services.mock.spec';
import { imagePipe } from '@shared/pipes/pipes.mock.spec';
import { of } from 'rxjs';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

const tournament = new Tournament({
  _id: '123',
  name: 'prueba',
  status: 'Todo',
  startDate: '',
  endDate: '',
  info: '',
  requisites: [],
  maxParticipants: 0,
});

describe('CarAddComponent', () => {
  let component: CarAddComponent;
  let fixture: ComponentFixture<CarAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CarAddComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        { provide: ImagePipe, useValue: imagePipe },
        { provide: BrandService, useValue: brandService },
        { provide: CarService, useValue: carService },
        { provide: AlertService, useValue: alertService },
        { provide: ImageService, useValue: imageService },
        { provide: ToastIonicService, useValue: toastIonicService },
        { provide: AnalyticsService, useValue: analyticsService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    const testbed = getTestBed();
    fixture = testbed.createComponent(CarAddComponent);
    component = fixture.componentInstance;
    brandService.getAll.and.returnValue(of({ items: [], paginator: {} }));
    fixture.detectChanges();
  }));

  it('should create', () => {
    spyOn(component, 'getAllBrands');
    expect(component).toBeTruthy();
  });
});

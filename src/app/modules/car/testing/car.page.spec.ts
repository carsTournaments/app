import { ImagePipe } from '@pipes';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import {
  AnalyticsService,
  CarService,
  ImageService,
  StorageService,
} from '@services';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  analyticsService,
  carService,
  imageService,
  navCtrl,
  storageService,
} from '@services/services.mock.spec';
import { car } from '@models/models.mock.spec';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import { CarModule } from '../car.module';
import { CarPage } from '../pages/car/car.page';

xdescribe('CarPage', () => {
  let component: CarPage;
  let fixture: ComponentFixture<CarPage>;
  const imagePipe = jasmine.createSpyObj('ImagePipe', ['transform']);
  carService.getOne = jasmine.createSpy().and.returnValue(of(car));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CarPage, ImagePipe],
      imports: [
        CarModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        { provide: CarService, useValue: carService },
        { provide: NavController, useValue: navCtrl },
        { provide: ImagePipe, useValue: imagePipe },
        { provide: AnalyticsService, useValue: analyticsService },
        { provide: ImageService, useValue: imageService },
        { provide: StorageService, useValue: storageService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '123',
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CarPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', async () => {
    spyOn(component, 'getOne');
    await component.ngOnInit();
    expect(component.vm.id).toBe('123');
    expect(component.getOne).toHaveBeenCalled();
  });

  describe('getOne', () => {
    it('OK', () => {
      car._id = '123';
      car.images = [];
      car.liked = true;
      car.driver = {
        _id: '12',
      };
      carService.getOne = jasmine.createSpy().and.returnValue(of(car));
      spyOn(component, 'checkIsMyCar');
      component.getOne();
      expect(component.vm.car._id).toBe('123');
    });
    it('KO', () => {
      carService.getOne = jasmine
        .createSpy()
        .and.returnValue(throwError({ error: '400' }));
      component.getOne();
      expect(component.vm.loading).toBe(false);
      expect(component.vm.error).toBe(true);
    });
  });

  describe('onClickTotalItem', () => {
    it('likes', () => {
      component.onClickTotalItem('likes');
      expect(analyticsService.logEvent).toHaveBeenCalled();
      expect(component.vm.states.votes).toBe(false);
    });
  });
});

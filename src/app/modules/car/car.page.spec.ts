import { ImagePipe } from '@pipes';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AnalyticsService, CarService } from '@services';
import { CarPage } from './car.page';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
    analyticsService,
    carService,
    navCtrl,
} from '@services/services.mock.spec';
import { car } from '@models/models.mock.spec';
import { SharedModule } from '@shared/shared.module';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('CarPage', () => {
    let component: CarPage;
    let fixture: ComponentFixture<CarPage>;
    const imagePipe = jasmine.createSpyObj('ImagePipe', ['transform']);
    carService.getOne = jasmine.createSpy().and.returnValue(of(car));

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CarPage, ImagePipe],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                IonicStorageModule.forRoot(),
                SharedModule,
            ],
            providers: [
                { provide: CarService, useValue: carService },
                { provide: NavController, useValue: navCtrl },
                { provide: ImagePipe, useValue: imagePipe },
                { provide: AnalyticsService, useValue: analyticsService },
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
});

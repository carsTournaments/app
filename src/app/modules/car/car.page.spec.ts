import { analyticsService } from './../../services/services.mock.spec';
import { ImagePipe } from 'src/app/pipes';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AnalyticsService, CarService } from 'src/app/services';
import { CarPage } from './car.page';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { carService, navCtrl } from 'src/app/services/services.mock.spec';
import { car } from 'src/app/models/models.mock.spec';

describe('CarPage', () => {
    let component: CarPage;
    let fixture: ComponentFixture<CarPage>;
    const imagePipe = jasmine.createSpyObj('ImagePipe', ['transform']);
    carService.getOne = jasmine.createSpy().and.returnValue(of(car));
    let route: ActivatedRoute;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CarPage, ImagePipe],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
                ComponentsModule,
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
                                get: () => '1',
                            },
                        },
                    },
                },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = TestBed.createComponent(CarPage);
        component = fixture.componentInstance;
        route = testbed.inject(ActivatedRoute);

        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit', async () => {
        spyOn(component, 'getOne');
        await component.ngOnInit();
        expect(component.vm.id).toBe('1');
        expect(component.getOne).toHaveBeenCalled();
    });

    describe('getOne', () => {
        it('OK', () => {
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

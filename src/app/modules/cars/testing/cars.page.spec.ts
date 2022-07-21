import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import {
    CarService,
    BrandService,
    LikeService,
    AnalyticsService,
    ActionSheetIonicService,
} from '@services';
import { Brand, Car } from '@models';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
    actionSheetService,
    analyticsService,
    brandService,
    carService,
    likeService,
} from '@services/services.mock.spec';
import { car } from '@models/models.mock.spec';
import { CarsModule } from '../cars.module';
import {
    TranslateModule,
    TranslateLoader,
    TranslateFakeLoader,
} from '@ngx-translate/core';
import { CarsPage } from '../pages/cars/cars.page';

describe('CarsPage', () => {
    let component: CarsPage;
    let fixture: ComponentFixture<CarsPage>;

    const navCtrl = jasmine.createSpyObj('NavController', ['navigateForward']);
    carService.getAll = jasmine.createSpy().and.returnValue(of([]));
    brandService.getAllBrandsAndCars = jasmine
        .createSpy()
        .and.returnValue(of([]));

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [CarsPage],
            imports: [
                RouterTestingModule,
                CarsModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateFakeLoader,
                    },
                }),
            ],
            providers: [
                { provide: CarService, useValue: carService },
                { provide: BrandService, useValue: brandService },
                { provide: NavController, useValue: navCtrl },
                { provide: AnalyticsService, useValue: analyticsService },
                { provide: LikeService, useValue: likeService },
                {
                    provide: ActionSheetIonicService,
                    useValue: actionSheetService,
                },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        const testbed = getTestBed();
        fixture = testbed.createComponent(CarsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });

    it('ionViewWillEnter', () => {
        spyOn(component, 'getCars');
        spyOn(component, 'getBrands');
        component.ionViewWillEnter();
        expect(component.getCars).toHaveBeenCalled();
        expect(component.getBrands).toHaveBeenCalled();
    });

    describe('getCars', () => {
        it('getCars', () => {
            const response = {
                items: [],
                paginator: {
                    currentPage: 0,
                    pageSize: 20,
                    totalPages: 0,
                    total: 20,
                },
            };
            carService.getAll = jasmine
                .createSpy()
                .and.returnValue(of(response));
            spyOn(component, 'getCarsOnSuccess');
            component.getCars();
            expect(component.getCarsOnSuccess).toHaveBeenCalled();
        });

        it('getCarsOnSuccess', () => {
            component.vm.cars = [];
            component.getCarsOnSuccess({ items: [new Car()] });
            expect(component.vm.cars.length).toBe(1);
        });

        it('getCarsOnSuccess with event', () => {
            component.vm.cars = [];
            component.getCarsOnSuccess(
                { items: [new Car(), new Car()] },
                { target: { complete: () => {} } }
            );
            expect(component.vm.cars.length).toBe(2);
        });
    });


    describe('getBrands', () => {
        it('getBrands', () => {
            const response = {
                items: [],
                paginator: {
                    currentPage: 0,
                    pageSize: 20,
                    totalPages: 0,
                    total: 20,
                },
            };
            brandService.getAllBrandsAndCars = jasmine
                .createSpy()
                .and.returnValue(of(response));
            spyOn(component, 'getBrandsOnSuccess');
            component.getBrands();
            expect(component.getBrandsOnSuccess).toHaveBeenCalled();
        });

        it('getBrandsOnSuccess', () => {
            component.vm.brands = [];
            component.getBrandsOnSuccess({ items: [new Brand()] });
            expect(component.vm.brands.length).toBe(1);
        });

        it('getBrandsOnSuccess with event', () => {
            component.vm.brands = [];
            component.getBrandsOnSuccess(
                { items: [new Brand(), new Brand()] },
                { target: { complete: () => {} } }
            );
            expect(component.vm.brands.length).toBe(2);
        });

        it('getBrandsOnFailed', () => {
            brandService.getAllBrandsAndCars = jasmine
                .createSpy()
                .and.returnValue(throwError({ error: 'Error' }));
            component.getBrands();
            expect(component.vm.loading.getBrands).toBe(false);
            expect(component.vm.error.getBrands).toBe(true);
        });
    });

    describe('loadMoreData', () => {
        it('type -> cars', () => {
            component.vm.carsBody.page = 5;
            spyOn(component, 'getCars');
            component.loadMoreData('', 'cars');
            expect(component.vm.carsBody.page).toBe(6);
            expect(component.getCars).toHaveBeenCalled();
        });

        it('type -> brands', () => {
            component.vm.brandsBody.page = 3;
            spyOn(component, 'getBrands');
            component.loadMoreData('', 'brands');
            expect(component.vm.brandsBody.page).toBe(4);
            expect(component.getBrands).toHaveBeenCalled();
        });
    });

    it('segmentChanged', () => {
        component.segmentChanged({ detail: { value: 0 } });
        expect(component.vm.header.segments.selected).toBe(0);
    });

    describe('onClick', () => {
        it('onClickBrand', () => {
            const brand = new Brand();
            brand._id = '1';
            component.onClickBrand(brand);
            expect(component.vm.carsBody.brand).toBe('1');
            expect(component.vm.filter).toBe(true);
            expect(component.vm.header.segments.selected).toBe(0);
        });

        it('onClickCar', () => {
            car._id = '1';
            component.goToCar(car);
            expect(navCtrl.navigateForward).toHaveBeenCalled();
        });
    });

    it('cleanFilter', () => {
        component.cleanFilter();
        expect(component.vm.carsBody.brand).toBe(null);
        expect(component.vm.carsBody.page).toBe(1);
        expect(component.vm.filter).toBe(false);
        expect(component.vm.header.segments.selected).toBe(0);
    });

    it('doRefresh', () => {
        spyOn(component, 'getCars');
        component.doRefresh({ target: { disabled: true } });
        expect(component.getCars).toHaveBeenCalled();
    });

    it('openFilter', () => {
        component.openFilter();
        expect(actionSheetService.present).toHaveBeenCalled();
    });
});

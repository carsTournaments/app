import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CarsPage } from './cars.page';
import { ComponentsModule } from 'src/app';
import { CarService, BrandService } from 'src/app/services';
import { Brand, Car } from 'src/app/models';

describe('CarsPage', () => {
    let component: CarsPage;
    let fixture: ComponentFixture<CarsPage>;
    let carService: CarService;
    let brandService: BrandService;
    let navCtrl: NavController;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CarsPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                ComponentsModule,
            ],
            providers: [CarService, BrandService],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = TestBed.createComponent(CarsPage);
        component = fixture.componentInstance;
        carService = testbed.inject(CarService);
        brandService = testbed.inject(BrandService);
        navCtrl = testbed.inject(NavController);
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit', () => {
        spyOn(component, 'getCars');
        spyOn(component, 'getBrands');
        component.ngOnInit();
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
            spyOn(carService, 'getAll').and.returnValue(of(response));
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
            spyOn(brandService, 'getAllBrandsAndCars').and.returnValue(
                of(response)
            );
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
            spyOn(navCtrl, 'navigateForward');
            const car = new Car();
            car._id = '1';
            component.onClickCar(car);
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
});

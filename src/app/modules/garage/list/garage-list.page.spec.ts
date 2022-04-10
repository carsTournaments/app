import { of } from 'rxjs';
import { User, Car } from 'src/app/models';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { CarService, StorageService } from 'src/app/services';
import { GarageListPage } from './garage-list.page';

describe('GarageListPage', () => {
    let component: GarageListPage;
    let fixture: ComponentFixture<GarageListPage>;
    let carService: CarService;
    let storageService: StorageService;
    let navCtrl: NavController;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [GarageListPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                ComponentsModule,
            ],
            providers: [CarService, StorageService, NavController],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = TestBed.createComponent(GarageListPage);
        carService = testbed.inject(CarService);
        storageService = testbed.inject(StorageService);
        navCtrl = testbed.inject(NavController);

        const user = new User();
        user._id = '123';
        spyOn(storageService, 'get').and.returnValue(Promise.resolve(user));
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit', async () => {
        spyOn(component, 'getMyUser');
        spyOn(component, 'getAllCars');
        await component.ngOnInit();
        expect(component.getMyUser).toHaveBeenCalled();
        expect(component.getAllCars).toHaveBeenCalled();
    });

    describe('getAllCars', () => {
        it('OK', () => {
            const response: Car[] = [new Car()];
            spyOn(carService, 'getAllOfDriver').and.returnValue(of(response));
            component.getAllCars();
            expect(carService.getAllOfDriver).toHaveBeenCalled();
            expect(component.vm.cars).toBe(response);
        });
    });

    describe('goTo', () => {
        it('edit', () => {
            spyOn(navCtrl, 'navigateForward');
            const car = new Car();
            car._id = '123';
            component.goTo('edit', car);
            expect(navCtrl.navigateForward).toHaveBeenCalledWith(
                `garage/one/${car._id}`
            );
        });

        it('addCar', () => {
            spyOn(navCtrl, 'navigateForward');
            component.onClickAddCar();
            expect(navCtrl.navigateForward).toHaveBeenCalledWith(
                `garage/create`
            );
        });
    });
});

import { ImageService } from 'src/app/services/api/image/image.service';
import { of, throwError } from 'rxjs';
import { User, Car, Image } from 'src/app/models';
import {
    ComponentFixture,
    fakeAsync,
    getTestBed,
    TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavController, PopoverController } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { AlertService, AuthService, CarService } from 'src/app/services';
import { GarageListPage } from './garage-list.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken('Window');

fdescribe('GarageListPage', () => {
    let component: GarageListPage;
    let fixture: ComponentFixture<GarageListPage>;
    let alertService: AlertService;
    let navCtrl: NavController;
    const car = new Car();
    car._id = '1';
    const carServiceMock = jasmine.createSpyObj('CarService', [
        'getAllOfDriver',
        'delete',
    ]);
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getUser']);
    const imageServiceMock = jasmine.createSpyObj('ImageService', ['addImage']);
    const alertServiceMock = jasmine.createSpyObj('AlertService', [
        'pressentAlert',
    ]);
    const popoverCtrlMock = jasmine.createSpyObj('PopoverController', [
        'create',
    ]);
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [GarageListPage],
            imports: [RouterTestingModule, ComponentsModule],
            providers: [
                { provider: CarService, useValue: carServiceMock },
                { provider: AuthService, useValue: authServiceMock },
                { provider: ImageService, useValue: imageServiceMock },
                { provider: AlertService, useValue: alertServiceMock },
                { provider: PopoverController, useValue: popoverCtrlMock },
                NavController,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        const testbed = getTestBed();
        fixture = TestBed.createComponent(GarageListPage);
        component = fixture.componentInstance;
        navCtrl = testbed.inject(NavController);
        alertService = testbed.inject(AlertService);
        authServiceMock.getUser = jasmine
            .createSpy()
            .and.returnValue(Promise.resolve(new User()));
        fixture.detectChanges();
        const user = new User();
        user._id = '123';
        component['authService'].getUser = () => Promise.resolve(user);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit', async () => {
        spyOn(component, 'getAllCars');
        await component.ngOnInit();
        expect(component.getAllCars).toHaveBeenCalled();
    });

    describe('getAllCars', () => {
        it('OK', async () => {
            component['carService'].getAllOfDriver = () => of([]);
            const response: Car[] = [];
            await component.getAllCars();
            expect(component.vm.cars).toEqual(response);
        });
        it('KO', fakeAsync(async () => {
            const user = new User();
            user._id = '123';
            component['authService'].getUser = () => Promise.resolve(user);
            component['carService'].getAllOfDriver = () =>
                throwError({ error: 'Error' });
            await component.getAllCars();
            expect(component.vm.error).toEqual(true);
            expect(component.vm.loading).toEqual(false);
        }));
    });

    describe('goTo', () => {
        it('edit', () => {
            spyOn(navCtrl, 'navigateForward');
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

    describe('openPopover', () => {
        it('popover -> edit', async () => {
            const popover: any = {
                present: () => {},
                onDidDismiss: () =>
                    Promise.resolve({
                        data: 'edit',
                    }),
            };
            spyOn(component, 'goTo');
            component['popoverCtrl'].create = () => Promise.resolve(popover);
            await component.openPopover('', car);
            expect(component.goTo).toHaveBeenCalled();
        });

        it('popover -> image', async () => {
            const popover: any = {
                present: () => {},
                onDidDismiss: () =>
                    Promise.resolve({
                        data: 'image',
                    }),
            };
            spyOn(component, 'addImage');
            component['popoverCtrl'].create = () => Promise.resolve(popover);
            await component.openPopover('', car);
            expect(component.addImage).toHaveBeenCalled();
        });

        it('popover -> delete', async () => {
            const popover: any = {
                present: () => {},
                onDidDismiss: () =>
                    Promise.resolve({
                        data: 'delete',
                    }),
            };
            spyOn(component, 'deleteCar');
            component['popoverCtrl'].create = () => Promise.resolve(popover);
            await component.openPopover('', car);
            expect(component.deleteCar).toHaveBeenCalled();
        });
    });

    describe('addImage', () => {
        it('OK', async () => {
            const image = new Image();
            spyOn(component, 'reloadPage');
            component['imageService'].addNewToGallery = () =>
                Promise.resolve(image);
            await component.addImage(car);
            expect(component.vm.loading).toEqual(false);
        });
        it('KO', async () => {
            spyOn(alertService, 'presentAlert');
            component['imageService'].addNewToGallery = () =>
                Promise.reject({ error: 'error' });
            await component.addImage(car);
            expect(component.vm.loading).toEqual(false);
        });
    });

    it('deleteCar', () => {
        component['alertService'].presentAlert = () => Promise.resolve();
        component.deleteCar(car);
        expect(true).toBe(true);
    });

    describe('deleteCarConfirmation', () => {
        it('OK', () => {
            spyOn(component, 'getAllCars');
            spyOn(alertService, 'presentAlert');
            component['carService'].delete = () => of(car);
            component.deleteCarConfirmation(car);
            expect(component.getAllCars).toHaveBeenCalled();
            expect(alertService.presentAlert).toHaveBeenCalled();
        });
        it('KO', () => {
            spyOn(component, 'getAllCars');
            spyOn(alertService, 'presentAlert');
            component['carService'].delete = () =>
                throwError({ error: 'Error' });
            component.deleteCarConfirmation(car);
            expect(alertService.presentAlert).toHaveBeenCalled();
        });
    });
});

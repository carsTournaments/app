// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import {
//     ComponentFixture,
//     waitForAsync,
//     TestBed,
//     getTestBed,
// } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { NavController, PopoverController } from '@ionic/angular';
// import { of, throwError } from 'rxjs';
// import { ComponentsModule } from 'src/app/components/components.module';
// import { car, user } from 'src/app/models/models.mock.spec';
// import {
//     AuthService,
//     AlertService,
//     CarService,
//     ImageService,
//     BrandService,
//     UtilsService,
// } from 'src/app/services';
// import {
//authService, brandService,
// alertService, carService, imageService, navCtrl, popoverCtrl, utilsService } from 'src/app/services/services.mock.spec';
// import { GarageOnePage } from './garage-one.page';

// xdescribe('GarageOnePage', () => {
//     let component: GarageOnePage;
//     let fixture: ComponentFixture<GarageOnePage>;
//     authService.getUser = jasmine.createSpy().and.returnValue(user);
//     brandService.getAll = jasmine.createSpy().and.returnValue(of([]));

//     beforeEach(waitForAsync(() => {
//         TestBed.configureTestingModule({
//             declarations: [GarageOnePage],
//             imports: [
//                 RouterTestingModule,
//                 HttpClientTestingModule,
//                 ComponentsModule,
//             ],
//             providers: [
//                 { provide: AuthService, useValue: authService },
//                 { provide: AlertService, useValue: alertService },
//                 { provide: BrandService, useValue: brandService },
//                 { provide: CarService, useValue: carService },
//                 { provide: ImageService, useValue: imageService },
//                 { provide: NavController, useValue: navCtrl },
//                 { provide: PopoverController, useValue: popoverCtrl },
//                 { provide: UtilsService, useValue: utilsService },
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA],
//         }).compileComponents();

//         const testbed = getTestBed();
//         fixture = testbed.createComponent(GarageOnePage);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     }));

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     describe('getOne', () => {
//         it('OK', () => {
//             component.vm.id = '5';
//             carService.getOne = jasmine.createSpy().and.returnValue(of(car));
//             component.getOne();
//             expect(carService.getOne).toHaveBeenCalled();
//         });
//         it('KO', () => {
//             component.vm.id = '5';
//             carService.getOne = jasmine
//                 .createSpy()
//                 .and.returnValue(throwError({ error: '400' }));
//             component.getOne();
//             expect(carService.getOne).toHaveBeenCalled();
//         });
//     });

//     describe('createOrUpdateItem', () => {
//         it('create', async () => {
//             component.vm.car = car;
//             component.vm.brandIdSelected = 'prueba';
//             component.vm.car.model = 'prueba';
//             component.vm.car.fuel = 'prueba';
//             component.vm.car.traction = 'prueba';
//             component.vm.car.driver = 'prueba';
//             component.vm.car.cv = 1000;
//             component.vm.car.cc = 3400;
//             component.vm.car.year = 2020;
//             component.vm.edit = false;
//             alertService.presentAlert = jasmine.createSpy().and.returnValue(Promise.resolve());
//             carService.create = jasmine.createSpy().and.returnValue(of(car));
//             await component.createOrUpdateItem();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//             // expect(navCtrl.navigateBack).toHaveBeenCalled();
//         });

//         it('edit', async () => {
//             component.vm.car = car;
//             component.vm.brandIdSelected = 'prueba';
//             component.vm.car.model = 'prueba';
//             component.vm.car.fuel = 'prueba';
//             component.vm.car.traction = 'prueba';
//             component.vm.car.driver = 'prueba';
//             component.vm.car.cv = 1000;
//             component.vm.car.cc = 3400;
//             component.vm.car.year = 2020;
//             component.vm.edit = true;
//             alertService.presentAlert = jasmine.createSpy().and.returnValue(Promise.resolve());
//             carService.update = jasmine.createSpy().and.returnValue(of(car));
//             await component.createOrUpdateItem();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//             // expect(navCtrl.navigateBack).toHaveBeenCalled();
//         });
//     });

//     describe('createOrUpdateItem - validations', () => {
//         it('validations -> brand', async () => {
//             component.vm.car = car;
//             component.vm.brandIdSelected = undefined;
//             component.vm.car.model = 'prueba';
//             component.vm.car.fuel = 'prueba';
//             component.vm.car.traction = 'prueba';
//             component.vm.car.cv = 1000;
//             component.vm.car.cc = 3400;
//             component.vm.car.year = 2020;
//             component.vm.edit = true;
//             await component.createOrUpdateItem();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });

//         it('validations -> model', async () => {
//             component.vm.car = car;
//             component.vm.brandIdSelected = 'prueba';
//             component.vm.car.model = undefined;
//             component.vm.car.traction = 'prueba';
//             component.vm.car.fuel = 'prueba';
//             component.vm.car.cv = 1000;
//             component.vm.car.cc = 3400;
//             component.vm.car.year = 2020;
//             await component.createOrUpdateItem();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });

//         it('validations -> traction', async () => {
//             component.vm.car = car;
//             component.vm.brandIdSelected = 'prueba';
//             component.vm.car.model = 'prueba';
//             component.vm.car.fuel = 'prueba';
//             component.vm.car.cv = 1000;
//             component.vm.car.year = 2020;
//             component.vm.car.cc = 5000;
//             component.vm.car.traction = undefined;
//             await component.createOrUpdateItem();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });

//         it('validations -> fuel', async () => {
//             component.vm.car = car;
//             component.vm.brandIdSelected = 'prueba';
//             component.vm.car.model = 'prueba';
//             component.vm.car.traction = 'prueba';
//             component.vm.car.cv = 1000;
//             component.vm.car.year = 2020;
//             component.vm.car.cc = 5000;
//             component.vm.car.fuel = undefined;
//             await component.createOrUpdateItem();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });

//         it('validations -> cv', async () => {
//             component.vm.car = car;
//             component.vm.brandIdSelected = 'prueba';
//             component.vm.car.year = 2020;
//             component.vm.car.model = 'prueba';
//             component.vm.car.traction = 'prueba';
//             component.vm.car.fuel = 'prueba';
//             component.vm.car.cc = 5000;
//             component.vm.car.cv = undefined;
//             await component.createOrUpdateItem();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });

//         it('validations -> cv - 1001', async () => {
//             component.vm.car = car;
//             component.vm.brandIdSelected = 'prueba';
//             component.vm.car.model = 'prueba';
//             component.vm.car.traction = 'prueba';
//             component.vm.car.fuel = 'prueba';
//             component.vm.car.cv = 1001;
//             component.vm.car.cc = 5000;
//             await component.createOrUpdateItem();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });

//         it('validations -> cc', async () => {
//             component.vm.car = car;
//             component.vm.brandIdSelected = 'prueba';
//             component.vm.car.year = 2020;
//             component.vm.car.model = 'prueba';
//             component.vm.car.traction = 'prueba';
//             component.vm.car.fuel = 'prueba';
//             component.vm.car.cv = 1000;
//             component.vm.car.cc = undefined;
//             await component.createOrUpdateItem();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });

//         it('validations -> cc - 5001', async () => {
//             component.vm.car = car;
//             component.vm.brandIdSelected = 'prueba';
//             component.vm.car.model = 'prueba';
//             component.vm.car.traction = 'prueba';
//             component.vm.car.fuel = 'prueba';
//             component.vm.car.cv = 1000;
//             component.vm.car.cc = 5001;
//             await component.createOrUpdateItem();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });

//         it('validations -> year - 2025', async () => {
//             component.vm.car = car;
//             component.vm.brandIdSelected = 'prueba';
//             component.vm.car.model = 'prueba';
//             component.vm.car.traction = 'prueba';
//             component.vm.car.fuel = 'prueba';
//             component.vm.car.cv = 1000;
//             component.vm.car.cc = 5000;
//             component.vm.car.year = 2025;
//             await component.createOrUpdateItem();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });

//         it('validations -> year', async () => {
//             component.vm.car = car;
//             component.vm.brandIdSelected = 'prueba';
//             component.vm.car.model = 'prueba';
//             component.vm.car.traction = 'prueba';
//             component.vm.car.fuel = 'prueba';
//             component.vm.car.cv = 1000;
//             component.vm.car.cc = 5000;
//             component.vm.car.year = undefined;
//             await component.createOrUpdateItem();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });
//     });
// });

// import { Car } from '@models';
// import {
//     ComponentFixture,
//     getTestBed,
//     TestBed,
//     waitForAsync,
// } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { NavController, PopoverController } from '@ionic/angular';
// import {
//     AlertService,
//     AuthService,
//     CarService,
//     ImageService,
//     UtilsService,
// } from '@services';
// import { of, throwError } from 'rxjs';
// import { GarageListPage } from './garage-list.page';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { user, car } from '@models/models.mock.spec';
// import {
//     authService,
//     carService,
//     alertService,
//     imageService,
//     navCtrl,
//     popoverCtrl,
//     utilsService,
// } from '@services/services.mock.spec';
// import { SharedModule } from '@shared/shared.module';

// describe('GarageListComponent', () => {
//     let component: GarageListPage;
//     let fixture: ComponentFixture<GarageListPage>;
//     authService.getUser = jasmine.createSpy().and.returnValue(user);
//     carService.getAllOfDriver = jasmine.createSpy().and.returnValue(of([]));

//     beforeEach(waitForAsync(() => {
//         TestBed.configureTestingModule({
//             declarations: [GarageListPage],
//             imports: [
//                 RouterTestingModule,
//                 HttpClientTestingModule,
//                 SharedModule,
//             ],
//             providers: [
//                 { provide: AuthService, useValue: authService },
//                 { provide: AlertService, useValue: alertService },
//                 { provide: CarService, useValue: carService },
//                 { provide: ImageService, useValue: imageService },
//                 { provide: NavController, useValue: navCtrl },
//                 { provide: PopoverController, useValue: popoverCtrl },
//                 { provide: UtilsService, useValue: utilsService },
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA],
//         }).compileComponents();

//         const testbed = getTestBed();
//         fixture = testbed.createComponent(GarageListPage);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     }));

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('ionViewWillEnter', async () => {
//         spyOn(component, 'getAllCars');
//         await component.ionViewWillEnter();
//         expect(component.getAllCars).toHaveBeenCalled();
//     });

//     describe('getAllCars', () => {
//         it('OK', async () => {
//             authService.getUser = jasmine.createSpy().and.returnValue(user);
//             carService.getAllOfDriver = jasmine
//                 .createSpy()
//                 .and.returnValue(of([]));
//             const response: Car[] = [];
//             await component.getAllCars();
//             expect(component.vm.user).not.toBeUndefined();
//             expect(component.vm.cars).toEqual(response);
//         });
//         it('KO', async () => {
//             carService.getAllOfDriver = jasmine
//                 .createSpy()
//                 .and.returnValue(throwError({ error: 'Error' }));
//             await component.getAllCars();
//             expect(component.vm.error).toEqual(true);
//             expect(component.vm.loading).toEqual(false);
//         });
//     });

//     describe('openPopover', () => {
//         it('popover -> edit', async () => {
//             const popover: any = {
//                 present: () => {},
//                 onDidDismiss: () =>
//                     Promise.resolve({
//                         data: 'edit',
//                     }),
//             };
//             spyOn(component, 'editCar');
//             popoverCtrl.create = jasmine
//                 .createSpy()
//                 .and.returnValue(Promise.resolve(popover));
//             await component.openPopover('', car);
//             expect(component.editCar).toHaveBeenCalled();
//         });

//         it('popover -> image', async () => {
//             const popover: any = {
//                 present: () => {},
//                 onDidDismiss: () =>
//                     Promise.resolve({
//                         data: 'image',
//                     }),
//             };
//             spyOn(component, 'addImage');
//             popoverCtrl.create = jasmine
//                 .createSpy()
//                 .and.returnValue(Promise.resolve(popover));
//             await component.openPopover('', car);
//             expect(component.addImage).toHaveBeenCalled();
//         });

//         it('popover -> delete', async () => {
//             const popover: any = {
//                 present: () => {},
//                 onDidDismiss: () =>
//                     Promise.resolve({
//                         data: 'delete',
//                     }),
//             };
//             spyOn(component, 'deleteCar');
//             popoverCtrl.create = jasmine
//                 .createSpy()
//                 .and.returnValue(Promise.resolve(popover));
//             await component.openPopover('', car);
//             expect(component.deleteCar).toHaveBeenCalled();
//         });
//     });

//     it('editCar', () => {
//         component.editCar(car);
//         expect(navCtrl.navigateForward).toHaveBeenCalledWith(
//             `garage/one/${car._id}`
//         );
//     });

//     describe('addImage', () => {
//         it('OK', async () => {
//             const image = new Image();
//             imageService.addNewToGallery = jasmine
//                 .createSpy()
//                 .and.returnValue(Promise.resolve(image));
//             await component.addImage(car);
//             expect(utilsService.reloadPage).toHaveBeenCalled();
//         });
//         it('KO', async () => {
//             imageService.addNewToGallery = jasmine
//                 .createSpy()
//                 .and.returnValue(Promise.reject({ error: 'error' }));
//             await component.addImage(car);
//             expect(alertService.presentAlertWithButtons).toHaveBeenCalled();
//         });
//     });

//     it('deleteCar', () => {
//         component['alertService'].presentAlert = () => Promise.resolve();
//         component.deleteCar(car);
//         expect(true).toBe(true);
//     });

//     describe('deleteCarConfirmation', () => {
//         it('OK', () => {
//             spyOn(component, 'getAllCars');
//             component['carService'].delete = () => of(car);
//             component.deleteCarConfirmation(car);
//             expect(component.getAllCars).toHaveBeenCalled();
//         });
//         it('KO', () => {
//             spyOn(component, 'getAllCars');
//             component['carService'].delete = () =>
//                 throwError({ error: 'Error' });
//             component.deleteCarConfirmation(car);
//             expect(true).toBe(true);
//         });
//     });

//     it('onClickCar', () => {
//         component.onClickAddCar();
//         expect(navCtrl.navigateForward).toHaveBeenCalledWith(`garage/create`);
//     });
// });

// import { LoginResponseI } from '@interfaces';
// import { User } from '@models';
// import {
//     ComponentFixture,
//     getTestBed,
//     TestBed,
//     waitForAsync,
// } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { IonicModule } from '@ionic/angular';
// import { AlertService, AuthService } from '@services';
// import { AuthComponent } from './auth.component';
// import { of, throwError } from 'rxjs';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { SharedModule } from '@shared/shared.module';
// import { IonicStorageModule } from '@ionic/storage-angular';

// describe('AuthComponent', () => {
//     let component: AuthComponent;
//     let fixture: ComponentFixture<AuthComponent>;
//     const alertService = jasmine.createSpyObj('AlertService', ['presentAlert']);
//     const authService = jasmine.createSpyObj('AuthService', [
//         'login',
//         'setUser',
//         'setToken',
//     ]);

//     beforeEach(waitForAsync(() => {
//         TestBed.configureTestingModule({
//             declarations: [AuthComponent],
//             imports: [
//                 RouterTestingModule,
//                 IonicStorageModule.forRoot(),
//                 SharedModule,
//             ],
//             providers: [
//                 { provide: AuthService, useValue: authService },
//                 { provide: AlertService, useValue: alertService },
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA],
//         }).compileComponents();

//         const testbed = getTestBed();
//         fixture = testbed.createComponent(AuthComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     }));

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     describe('login', () => {
//         it('OK', () => {
//             const response: LoginResponseI = {
//                 user: new User(),
//                 token: 'token',
//             };
//             authService.login = jasmine.createSpy().and.returnValue(of(true));
//             component.vm.email = 'prueba@prueba.es';
//             component.vm.password = '123456';
//             component.login();
//             expect(authService.login).toHaveBeenCalled();
//         });

//         it('KO', () => {
//             authService.login = jasmine
//                 .createSpy()
//                 .and.returnValue(throwError({ status: 400 }));
//             component.vm.email = 'prueba@prueba.es';
//             component.vm.password = '123456';
//             component.login();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });
//     });

//     describe('register', () => {
//         it('OK', () => {
//             const response: LoginResponseI = {
//                 user: new User(),
//                 token: 'token',
//             };
//             authService.register = jasmine
//                 .createSpy()
//                 .and.returnValue(of(response));
//             component.vm.name = 'prueba';
//             component.vm.email = 'prueba@prueba.es';
//             component.vm.password = '123456';
//             component.vm.password2 = '123456';
//             component.register();
//             expect(authService.setToken).toHaveBeenCalled();
//             expect(authService.setUser).toHaveBeenCalled();
//         });

//         it('KO Validation invalid passwords', () => {
//             component.vm.name = 'prueba';
//             component.vm.email = 'prueba@prueba.es';
//             component.vm.password = '123456';
//             component.vm.password2 = '12345';
//             component.register();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });

//         it('KO Validation invalid data', () => {
//             component.vm.name = 'prueba';
//             component.vm.email = '';
//             component.vm.password = '123456';
//             component.vm.password2 = '123456';
//             component.register();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });

//         it('KO Validation invalid name', () => {
//             component.vm.name = 'pep';
//             component.vm.email = 'pep@gmail.com';
//             component.vm.password = '123456';
//             component.vm.password2 = '123456';
//             component.register();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });

//         it('KO', () => {
//             authService.register = jasmine
//                 .createSpy()
//                 .and.returnValue(throwError({ status: 400 }));
//             component.vm.name = 'prueba';
//             component.vm.email = 'prueba@prueba.es';
//             component.vm.password = '123456';
//             component.vm.password2 = '123456';
//             component.register();
//             expect(alertService.presentAlert).toHaveBeenCalled();
//         });
//     });
// });

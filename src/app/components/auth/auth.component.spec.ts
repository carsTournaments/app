import { LoginResponseI } from 'src/app/interfaces/login-response.interface';
import { User } from 'src/app/models';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { AlertService, AuthService } from 'src/app/services';
import { ComponentsModule } from '../components.module';
import { AuthComponent } from './auth.component';
import { of, throwError } from 'rxjs';

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    const alertService = jasmine.createSpyObj('AlertService', ['presentAlert']);
    const authService = jasmine.createSpyObj('AuthService', [
        'login',
        'setUser',
        'setToken',
    ]);

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AuthComponent],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                ComponentsModule,
            ],
            providers: [
                { provide: AuthService, useValue: authService },
                { provide: AlertService, useValue: alertService },
            ],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = testbed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('login', () => {
        it('OK', () => {
            spyOn(component, 'onLoginOrRegisterSuccess');
            const response: LoginResponseI = {
                user: new User(),
                token: 'token',
            };
            authService.login = jasmine
                .createSpy()
                .and.returnValue(of(response));
            component.vm.email = 'prueba@prueba.es';
            component.vm.password = '123456';
            component.login();
            expect(component.onLoginOrRegisterSuccess).toHaveBeenCalled();
        });

        it('KO', () => {
            authService.login = jasmine
                .createSpy()
                .and.returnValue(throwError({ status: 400 }));
            component.vm.email = 'prueba@prueba.es';
            component.vm.password = '123456';
            component.login();
            expect(alertService.presentAlert).toHaveBeenCalled();
        });
    });

    describe('register', () => {
        it('OK', () => {
            const response: LoginResponseI = {
                user: new User(),
                token: 'token',
            };
            authService.register = jasmine
                .createSpy()
                .and.returnValue(of(response));
            component.vm.name = 'prueba';
            component.vm.email = 'prueba@prueba.es';
            component.vm.password = '123456';
            component.vm.password2 = '123456';
            component.register();
            expect(authService.setToken).toHaveBeenCalled();
            expect(authService.setUser).toHaveBeenCalled();
        });

        it('KO Validation invalid passwords', () => {
            component.vm.name = 'prueba';
            component.vm.email = 'prueba@prueba.es';
            component.vm.password = '123456';
            component.vm.password2 = '12345';
            component.register();
            expect(alertService.presentAlert).toHaveBeenCalled();
        });

        it('KO Validation invalid data', () => {
            component.vm.name = 'prueba';
            component.vm.email = '';
            component.vm.password = '123456';
            component.vm.password2 = '123456';
            component.register();
            expect(alertService.presentAlert).toHaveBeenCalled();
        });

        it('KO Validation invalid name', () => {
            component.vm.name = 'pep';
            component.vm.email = 'pep@gmail.com';
            component.vm.password = '123456';
            component.vm.password2 = '123456';
            component.register();
            expect(alertService.presentAlert).toHaveBeenCalled();
        });

        it('KO', () => {
            authService.register = jasmine
                .createSpy()
                .and.returnValue(throwError({ status: 400 }));
            component.vm.name = 'prueba';
            component.vm.email = 'prueba@prueba.es';
            component.vm.password = '123456';
            component.vm.password2 = '123456';
            component.register();
            expect(alertService.presentAlert).toHaveBeenCalled();
        });
    });
});

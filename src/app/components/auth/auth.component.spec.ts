import { LoginResponseI } from 'src/app/interfaces/login-response.interface';
import { User } from 'src/app/models';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { AlertService, AuthService } from 'src/app/services';
import { ComponentsModule } from '../components.module';
import { AuthComponent } from './auth.component';
import { Observable, of, throwError } from 'rxjs';

describe('AuthComponent', () => {
    let component: AuthComponent;
    let authService: AuthService;
    let alertService: AlertService;
    let fixture: ComponentFixture<AuthComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AuthComponent],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                ComponentsModule,
            ],
            providers: [AuthService, AlertService],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        authService = testbed.inject(AuthService);
        alertService = testbed.inject(AlertService);
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('login', () => {
        it('OK', () => {
            spyOn(authService, 'setToken');
            spyOn(authService, 'setUser');
            const response: LoginResponseI = {
                user: new User(),
                token: 'token',
            };
            spyOn(authService, 'login').and.returnValue(of(response));
            component.vm.email = 'prueba@prueba.es';
            component.vm.password = '123456';
            component.login();
            expect(authService.setToken).toHaveBeenCalled();
            expect(authService.setUser).toHaveBeenCalled();
        });

        it('KO', () => {
            spyOn(alertService, 'presentAlert');
            spyOn(authService, 'login').and.returnValue(
                throwError({ status: 400 })
            );
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
            spyOn(authService, 'setToken');
            spyOn(authService, 'setUser');
            spyOn(authService, 'register').and.returnValue(of(response));
            component.vm.name = 'prueba';
            component.vm.email = 'prueba@prueba.es';
            component.vm.password = '123456';
            component.vm.password2 = '123456';
            component.register();
            expect(authService.setToken).toHaveBeenCalled();
            expect(authService.setUser).toHaveBeenCalled();
        });

        it('KO Validation invalid passwords', () => {
            spyOn(alertService, 'presentAlert');
            component.vm.name = 'prueba';
            component.vm.email = 'prueba@prueba.es';
            component.vm.password = '123456';
            component.vm.password2 = '12345';
            component.register();
            expect(alertService.presentAlert).toHaveBeenCalled();
        });

        it('KO Validation invalid data', () => {
            spyOn(alertService, 'presentAlert');
            component.vm.name = 'prueba';
            component.vm.email = '';
            component.vm.password = '123456';
            component.vm.password2 = '123456';
            component.register();
            expect(alertService.presentAlert).toHaveBeenCalled();
        });

        it('KO Validation invalid name', () => {
            spyOn(alertService, 'presentAlert');
            component.vm.name = 'pep';
            component.vm.email = 'pep@gmail.com';
            component.vm.password = '123456';
            component.vm.password2 = '123456';
            component.register();
            expect(alertService.presentAlert).toHaveBeenCalled();
        });

        it('KO', () => {
            spyOn(alertService, 'presentAlert');
            spyOn(authService, 'register').and.returnValue(
                throwError({ status: 400 })
            );
            component.vm.name = 'prueba';
            component.vm.email = 'prueba@prueba.es';
            component.vm.password = '123456';
            component.vm.password2 = '123456';
            component.register();
            expect(alertService.presentAlert).toHaveBeenCalled();
        });
    });
});

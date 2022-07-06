import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavController } from '@ionic/angular';
import { OptionItemI } from '@interfaces';
import {
    AuthService,
    AlertService,
    AnalyticsService,
    UserService,
} from '@services';
import {
    alertService,
    analyticsService,
    authService,
    navCtrl,
    userService,
} from '@services/services.mock.spec';

import { AccountPage } from '../pages/account/account.page';
import {
    TranslateFakeLoader,
    TranslateLoader,
    TranslateModule,
} from '@ngx-translate/core';
import { AccountModule } from '../account.module';
import { User } from '@models';
import { of } from 'rxjs';

describe('AccountPage', () => {
    let component: AccountPage;
    let fixture: ComponentFixture<AccountPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AccountPage],
            imports: [
                AccountModule,
                RouterTestingModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateFakeLoader,
                    },
                }),
            ],
            providers: [
                { provide: AuthService, useValue: authService },
                { provide: AlertService, useValue: alertService },
                { provide: AnalyticsService, useValue: analyticsService },
                { provide: UserService, useValue: userService },
                { provide: NavController, useValue: navCtrl },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = TestBed.createComponent(AccountPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ionViewWillEnter', () => {
        it('isLogged', async () => {
            userService.getUser = jasmine
                .createSpy()
                .and.returnValue(new User());
            authService.isAuthenticated = jasmine
                .createSpy()
                .and.returnValue(true);
            spyOn(component, 'getResume');
            component.ionViewWillEnter();
            expect(component.getResume).toHaveBeenCalled();
            expect(component.logged).toBe(true);
        });

        it('isNotLogged', async () => {
            userService.getUser = jasmine.createSpy().and.returnValue(null);
            authService.isAuthenticated = jasmine
                .createSpy()
                .and.returnValue(false);
            component.ionViewWillEnter();
            expect(component.logged).toBe(false);
        });
    });

    describe('getResume', () => {
        it('should call userService.getResume', () => {
            userService.getResume = jasmine.createSpy().and.returnValue(of({}));
            component.getResume();
            expect(userService.getResume).toHaveBeenCalled();
        });
    });

    describe('onClickOption', () => {
        it('navigateForward', () => {
            const item: OptionItemI = {
                route: 'perro',
                name: '',
                icon: '',
            };
            component.onClickOption(item);
            expect(navCtrl.navigateForward).toHaveBeenCalled();
        });

        it('logout', () => {
            spyOn(component, 'logout');
            const item: OptionItemI = {
                value: 'logout',
                name: '',
                icon: '',
            };
            component.onClickOption(item);
            expect(component.logout).toHaveBeenCalled();
        });
    });

    it('logout', async () => {
        alertService.presentAlertWithButtons = jasmine
            .createSpy()
            .and.returnValue(
                Promise.resolve({
                    present: (): Promise<void> => Promise.resolve(),
                    onDidDismiss: () => ({
                        data: {
                            data: { role: 'ok' },
                        },
                    }),
                })
            );
        authService.logout = jasmine
            .createSpy()
            .and.returnValue(Promise.resolve());
        await component.logout();
        expect(alertService.presentAlertWithButtons).toHaveBeenCalled();
    });
});

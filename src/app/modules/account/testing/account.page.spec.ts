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
import { AuthService, AlertService, AnalyticsService } from '@services';
import {
    alertService,
    analyticsService,
    authService,
    navCtrl,
} from '@services/services.mock.spec';

import { AccountPage } from '../pages/account/account.page';
import {
    TranslateFakeLoader,
    TranslateLoader,
    TranslateModule,
} from '@ngx-translate/core';
import { AccountModule } from '../account.module';

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

    describe('onInit', () => {
        it('isLogged', async () => {
            authService.isAuthenticated = jasmine
                .createSpy()
                .and.returnValue(true);
            await component.isAuthenticated();
            expect(component.logged).toBe(false);
        });

        it('isNotLogged', async () => {
            authService.isAuthenticated = jasmine
                .createSpy()
                .and.returnValue(false);
            await component.isAuthenticated();
            expect(component.logged).toBe(false);
        });
    });

    it('logout', async () => {
        await component.logout();
        expect(alertService.presentAlertWithButtons).toHaveBeenCalled();
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
});

import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { OptionItemI } from 'src/app/interfaces/option-item.interface';
import { AuthService, AlertService } from 'src/app/services';

import { DashboardPage } from './dashboard.page';

describe('DashboardPage', () => {
    let component: DashboardPage;
    let authService: AuthService;
    let alertService: AlertService;
    let navCtrl: NavController;
    let fixture: ComponentFixture<DashboardPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                ComponentsModule,
            ],
            providers: [AuthService, AlertService],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = TestBed.createComponent(DashboardPage);
        component = fixture.componentInstance;
        authService = testbed.inject(AuthService);
        alertService = testbed.inject(AlertService);
        navCtrl = testbed.inject(NavController);
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onInit', () => {
        it('isLogged', async () => {
            spyOn(authService, 'isAuthenticated').and.returnValue(true);
            await component.isAuthenticated();
            expect(component.logged).toBe(true);
        });

        it('isNotLogged', async () => {
            spyOn(authService, 'isAuthenticated').and.returnValue(false);
            await component.isAuthenticated();
            expect(component.logged).toBe(false);
        });
    });

    it('logout', () => {
        spyOn(alertService, 'presentAlertWithButtons');
        component.logout();
        expect(alertService.presentAlertWithButtons).toHaveBeenCalled();
    });

    it('onLogoutClick', () => {
        spyOn(authService, 'logout');
        component.onLogoutClick();
        expect(component.logged).toBe(false);
        expect(authService.logout).toHaveBeenCalled();
    });

    describe('onClickOption', () => {
        it('navigateForward', () => {
            spyOn(navCtrl, 'navigateForward');
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

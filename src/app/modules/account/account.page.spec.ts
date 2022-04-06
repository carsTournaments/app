import { ComponentFixture, getTestBed, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { AuthService } from 'src/app/services';

import { AccountPage } from './account.page';

describe('AccountPage', () => {
    let component: AccountPage;
    let authService: AuthService;
    let fixture: ComponentFixture<AccountPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AccountPage],
            imports: [IonicModule.forRoot(), RouterTestingModule, ComponentsModule],
            providers: [AuthService]
        }).compileComponents();

        const testbed = getTestBed();
        fixture = TestBed.createComponent(AccountPage);
        component = fixture.componentInstance;
        authService = testbed.inject(AuthService);
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onInit', () => {
        it('isLogged', async () => {
            spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true))
            await component.isAuthenticated();
            expect(component.logged).toBe(true)
        })

        it('isNotLogged', async () => {
            spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(false))
            await component.isAuthenticated();
            expect(component.logged).toBe(false)
        })
    })
});

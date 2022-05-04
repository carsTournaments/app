import { StorageService } from './services/ionic/storage.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import { AlertService, AnalyticsService } from './services';
import { NavController } from '@ionic/angular';
import {
    navCtrl,
    analyticsService,
    alertService,
    storageService,
    location,
} from './services/services.mock.spec';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [IonicStorageModule.forRoot(), ServicesModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: AlertService, useValue: alertService },
                { provide: Location, useValue: location },
                { provide: StorageService, useValue: storageService },
                { provide: NavController, useValue: navCtrl },
                { provide: AnalyticsService, useValue: analyticsService },
            ],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = testbed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('ngOnInit', async () => {
        spyOn(component, 'addEventBackButton');
        await component.ngOnInit();
        expect(component.addEventBackButton).toHaveBeenCalled();
    });

    describe('onBackButton', () => {
        it('tournaments', async () => {
            component.location.isCurrentPathEqualTo = jasmine
                .createSpy()
                .and.returnValue('/tab/tournaments');
            await component.onBackButton(() => {});
            expect(
                component.location.isCurrentPathEqualTo
            ).toHaveBeenCalledWith('/tab/tournaments');
            // expect(alertService.presentAlertWithButtons).toHaveBeenCalled();
        });

        it('tournaments', async () => {
            component.location.back = jasmine
                .createSpy()
                .and.returnValue(() => {});
            await component.onBackButton(null);
            expect(component.location.back).toHaveBeenCalled();
        });
    });
});

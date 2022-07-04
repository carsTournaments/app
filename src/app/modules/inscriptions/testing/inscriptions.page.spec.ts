import { InscriptionsModule } from '../inscriptions.module';
import { ImagePipe } from '@pipes';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { AuthService, InscriptionService } from '@services';
import { Inscription } from '@models';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { car, tournament, user } from '@models/models.mock.spec';
import {
    TranslateModule,
    TranslateLoader,
    TranslateFakeLoader,
} from '@ngx-translate/core';
import { InscriptionsPage } from '../pages/inscriptions/inscriptions.page';

const inscription = new Inscription({
    _id: '123',
    car,
    tournament,
    driver: user,
});

const getAllForDriverResponse = {
    todo: [{ tournament, cars: [car] }],
    inProgress: [{ tournament, cars: [car] }],
    completed: [{ tournament, cars: [car] }],
};

describe('InscriptionsPage', () => {
    let component: InscriptionsPage;
    let fixture: ComponentFixture<InscriptionsPage>;
    const navCtrl = jasmine.createSpyObj('NavController', ['navigateForward']);
    const inscriptionService = jasmine.createSpyObj('InscriptionService', [
        'getAllForDriver',
    ]);
    const authService = jasmine.createSpyObj('AuthService', ['getUser']);

    inscriptionService.getAllForDriver = jasmine
        .createSpy()
        .and.returnValue(of(getAllForDriverResponse));
    authService.getUser = jasmine.createSpy().and.returnValue(user);
    let route: ActivatedRoute;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [InscriptionsPage, ImagePipe],
            imports: [
                InscriptionsModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateFakeLoader,
                    },
                }),
            ],
            providers: [
                { provide: InscriptionService, useValue: inscriptionService },
                { provide: NavController, useValue: navCtrl },
                { provide: AuthService, useValue: authService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: () => '1',
                            },
                        },
                    },
                },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = TestBed.createComponent(InscriptionsPage);
        component = fixture.componentInstance;
        route = testbed.inject(ActivatedRoute);

        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('getAll', () => {
        it('OK', () => {
            component.vm.user = user;
            component.vm.user._id = '1';
            inscriptionService.getAllForDriver = jasmine
                .createSpy()
                .and.returnValue(of(getAllForDriverResponse));
            component.getAll();
            expect(inscriptionService.getAllForDriver).toHaveBeenCalled();
            expect(component.vm.inscriptions).toEqual(getAllForDriverResponse);
        });
        it('KO', () => {
            component.vm.user = user;
            component.vm.user._id = '1';
            inscriptionService.getAllForDriver = jasmine
                .createSpy()
                .and.returnValue(throwError('error'));
            component.getAll();
            expect(component.vm.loading).toBe(false);
            expect(component.vm.error).toBe(true);
        });
    });

    // it('segmentChanged', () => {
    //     component.segmentChanged({ detail: { value: 0 } });
    //     expect(component.vm.header.segments.selected).toEqual(0);
    // });

    it('goToTournament', () => {
        component.goToTournament(inscription);
        expect(navCtrl.navigateForward).toHaveBeenCalledWith(
            `tournament/${inscription.tournament._id}`
        );
    });
});

import { car } from './../../models/models.mock.spec';
import { Tournament } from 'src/app/models';
import { ImagePipe } from 'src/app/pipes';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import {
    AnalyticsService,
    AuthService,
    InscriptionService,
    TournamentService,
} from 'src/app/services';
import { ActivatedRoute, Route } from '@angular/router';
import { TournamentPage } from './tournament.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InscriptionGetMyCarsUserForInscriptionResponse } from 'src/app/services/api/inscription/inscription.responses';
import { ComponentsModule } from 'src/app/components/components.module';
import { user, inscription } from 'src/app/models/models.mock.spec';
import {
    analyticsService,
    authService,
    inscriptionService,
    navCtrl,
} from 'src/app/services/services.mock.spec';

const tournament = new Tournament({
    _id: '123',
    name: 'prueba',
    status: 'InProgress',
    startDate: '',
    endDate: '',
    info: '',
    requisites: [],
    maxParticipants: 0,
});

const responseGetMyCarsForInscription: InscriptionGetMyCarsUserForInscriptionResponse =
    {
        inscribed: [],
        availables: [],
        notAvailables: [],
    };

describe('TournamentPage', () => {
    tournament.inscriptions = [];
    let component: TournamentPage;
    let fixture: ComponentFixture<TournamentPage>;

    const tournamentService = jasmine.createSpyObj('TournamentService', [
        'getOne',
    ]);
    let route: ActivatedRoute;

    authService.getUser = jasmine.createSpy().and.returnValue(user);
    inscriptionService.getAllOfTournament = jasmine
        .createSpy()
        .and.returnValue(of([inscription]));
    inscriptionService.getMyCarsForInscription = jasmine
        .createSpy()
        .and.returnValue(of(responseGetMyCarsForInscription));
    tournamentService.getOne = jasmine
        .createSpy()
        .and.returnValue(of(tournament));

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TournamentPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule,
                ComponentsModule,
            ],
            providers: [
                { provide: AuthService, useValue: authService },
                { provide: TournamentService, useValue: tournamentService },
                { provide: InscriptionService, useValue: inscriptionService },
                { provide: AnalyticsService, useValue: analyticsService },
                ImagePipe,
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
                { provide: NavController, useValue: navCtrl },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = TestBed.createComponent(TournamentPage);
        component = fixture.componentInstance;
        route = testbed.inject(ActivatedRoute);

        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ionViewWillEnter', async () => {
        spyOn(component, 'getInscriptionsOfTournament');
        spyOn(component, 'getOne');
        await component.ionViewWillEnter();
        expect(component.vm.id).toBe('1');
        expect(component.getOne).toHaveBeenCalled();
    });

    describe('getOne', () => {
        it('OK -> col 6', () => {
            tournamentService.getOne = jasmine
                .createSpy()
                .and.returnValue(of(tournament));
            component.getOne();
            expect(component.vm.tournament._id).toBe('123');
            expect(component.vm.loading.getOne).toBe(false);
        });

        it('OK -> col 4', () => {
            tournament.status = 'Todo';
            tournamentService.getOne = jasmine
                .createSpy()
                .and.returnValue(of(tournament));
            component.getOne();
            expect(component.vm.tournament._id).toBe('123');
            expect(component.vm.loading.getOne).toBe(false);
        });

        it('KO', () => {
            tournamentService.getOne = jasmine
                .createSpy()
                .and.returnValue(throwError({ error: 400 }));
            component.getOne();
            expect(component.vm.loading.getOne).toBe(false);
            expect(component.vm.error.getOne).toBe(true);
        });
    });

    describe('getInscriptionsOfTournament', () => {
        it('OK', () => {
            component.vm.id = '123';
            inscriptionService.getAllOfTournament = jasmine
                .createSpy()
                .and.returnValue(of([inscription]));

            spyOn(component, 'getCarsUsersForInscription');
            spyOn(component, 'checkButtonInscription');
            component.getInscriptionsOfTournament();
            expect(component.vm.inscriptions).toEqual([inscription]);
            expect(component.vm.error.getInscriptionsOfTournament).toEqual(
                false
            );
            expect(component.vm.loading.getInscriptionsOfTournament).toEqual(
                false
            );
        });
        it('KO', () => {
            spyOn(component, 'ionViewWillEnter');
            inscriptionService.getAllOfTournament = jasmine
                .createSpy()
                .and.returnValue(throwError({ error: 400 }));
            component.getInscriptionsOfTournament();
            expect(component.vm.error.getInscriptionsOfTournament).toEqual(
                true
            );
            expect(component.vm.loading.getInscriptionsOfTournament).toEqual(
                false
            );
        });
    });

    describe('checkButtonInscription', () => {
        it('InProgress || Completed', () => {
            component.vm.tournament = tournament;
            component.vm.tournament.status = 'Completed';
            component.checkButtonInscription();
            expect(component.vm.buttonInscription).toEqual(false);
        });

        it('Todo', async () => {
            // TODO: arreglar test
            spyOn(component, 'getCarsUsersForInscription');
            component.vm.tournament = tournament;
            component.vm.tournament.status = 'Todo';
            await component.checkButtonInscription();
            expect(component.getCarsUsersForInscription).not.toHaveBeenCalled();
        });
    });

    describe('getCarsUsersForInscription', () => {
        it('OK availables.length === 0', () => {
            component.vm.user = user;
            responseGetMyCarsForInscription.availables = [];
            inscriptionService.getMyCarsForInscription = jasmine
                .createSpy()
                .and.returnValue(of(responseGetMyCarsForInscription));
            component.getCarsUsersForInscription();
            expect(component.vm.inscriptions).toEqual([]);
            expect(component.vm.buttonInscription).toEqual(false);
            expect(component.vm.loading.getCarsUsersForInscription).toEqual(
                false
            );
            expect(component.vm.error.getCarsUsersForInscription).toEqual(
                false
            );
        });
        it('OK availables.length === 1', () => {
            component.vm.user = user;
            responseGetMyCarsForInscription.availables = [car];
            inscriptionService.getMyCarsForInscription = jasmine
                .createSpy()
                .and.returnValue(of(responseGetMyCarsForInscription));
            component.getCarsUsersForInscription();
            expect(component.vm.buttonInscription).toEqual(true);
            expect(component.vm.loading.getCarsUsersForInscription).toEqual(
                false
            );
            expect(component.vm.error.getCarsUsersForInscription).toEqual(
                false
            );
        });

        it('KO', () => {
            component.vm.user = user;
            inscriptionService.getMyCarsForInscription = jasmine
                .createSpy()
                .and.returnValue(throwError({ error: 400 }));
            component.getCarsUsersForInscription();
            expect(component.vm.loading.getCarsUsersForInscription).toEqual(
                false
            );
            expect(component.vm.error.getCarsUsersForInscription).toEqual(true);
        });
    });

    it('segmentChanged', () => {
        component.segmentChanged({ detail: { value: 0 } });
        expect(component.vm.header.segments.selected).toBe(0);
    });
});

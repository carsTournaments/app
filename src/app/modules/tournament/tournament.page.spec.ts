import { Tournament, User } from 'src/app/models';
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
    AuthService,
    InscriptionService,
    TournamentService,
} from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { TournamentPage } from './tournament.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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

const user = new User({
    _id: '123',
    name: 'prueba',
    email: 'prueba@prueba.es',
    role: 'USER',
});

describe('TournamentPage', () => {
    let component: TournamentPage;
    let fixture: ComponentFixture<TournamentPage>;
    const authService = jasmine.createSpyObj('AuthService', ['getUser']);
    const inscriptionService = jasmine.createSpyObj('InscriptionService', [
        'getAllOfTournament',
    ]);
    const navCtrl = jasmine.createSpyObj('NavController', ['navigateForward']);
    const tournamentService = jasmine.createSpyObj('TournamentService', [
        'getOne',
    ]);
    const imagePipe = jasmine.createSpyObj('ImagePipe', ['transform']);
    authService.getUser = jasmine.createSpy().and.returnValue(user);
    inscriptionService.getAllOfTournament = jasmine
        .createSpy()
        .and.returnValue(of([]));
    tournamentService.getOne = jasmine
        .createSpy()
        .and.returnValue(of(tournament));
    let route: ActivatedRoute;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TournamentPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule,
            ],
            providers: [
                { provide: AuthService, useValue: authService },
                { provide: TournamentService, useValue: tournamentService },
                { provide: InscriptionService, useValue: inscriptionService },
                InscriptionService,
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

    it('ngOnInit', async () => {
        spyOn(component, 'getInscriptionsOfTournament');
        spyOn(component, 'getOne');
        await component.ngOnInit();
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
            expect(component.vm.image).toBe('assets/no-image.png');
            expect(component.vm.loading).toBe(false);
        });

        it('OK -> col 4', () => {
            tournament.status = 'Todo';
            tournamentService.getOne = jasmine
                .createSpy()
                .and.returnValue(of(tournament));
            component.getOne();
            expect(component.vm.tournament._id).toBe('123');
            expect(component.vm.image).toBe('assets/no-image.png');
            expect(component.vm.loading).toBe(false);
        });

        it('KO', () => {
            tournamentService.getOne = jasmine
                .createSpy()
                .and.returnValue(throwError({ error: 400 }));
            component.getOne();
            expect(component.vm.loading).toBe(false);
            expect(component.vm.error).toBe(true);
        });
    });

    describe('getInscriptionsOfTournament', () => {
        it('OK', () => {
            component.vm.id = '123';
            inscriptionService.getAllOfTournament = jasmine
                .createSpy()
                .and.returnValue(of([]));
            spyOn(component, 'getCarsUsersForInscription');
            spyOn(component, 'checkButtonInscription');
            component.getInscriptionsOfTournament();
            expect(component.vm.inscriptions).toEqual([]);
        });
    });

    it('segmentChanged', () => {
        component.segmentChanged({ detail: { value: 0 } });
        expect(component.vm.header.segments.selected).toBe(0);
    });
});

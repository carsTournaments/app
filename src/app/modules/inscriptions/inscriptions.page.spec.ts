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
import { AuthService, CarService, InscriptionService } from 'src/app/services';
import { Car, Inscription, Tournament, User } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InscriptionsPage } from './inscriptions.page';

const car = new Car({
    _id: '123',
    brand: 'prueba',
    model: 'prueba',
    driver: '1',
    year: 2020,
    cc: 1,
    cv: 1,
    stock: false,
    fuel: '',
    traction: '',
    info: '',
});

const tournament = new Tournament({
    _id: '123',
    name: 'prueba',
    status: 'Todo',
    startDate: '',
    endDate: '',
    info: '',
    requisites: [],
    maxParticipants: 0,
});
const tournament2 = new Tournament({
    _id: '123',
    name: 'prueba',
    status: 'InProgress',
    startDate: '',
    endDate: '',
    info: '',
    requisites: [],
    maxParticipants: 0,
});
const tournament3 = new Tournament({
    _id: '123',
    name: 'prueba',
    status: 'Completed',
    startDate: '',
    endDate: '',
    info: '',
    requisites: [],
    maxParticipants: 0,
});

const inscription = new Inscription({
    _id: '123',
    car,
    tournament,
});

const user = new User({
    _id: '123',
    name: 'prueba',
    email: 'prueba@prueba.es',
    role: 'USER',
});

const getAllForDriverResponse = {
    todo: [{ car, tournament }],
    inProgress: [{ car, tournament: tournament2 }],
    completed: [{ car, tournament: tournament3 }],
};

describe('InscriptionsPage', () => {
    let component: InscriptionsPage;
    let fixture: ComponentFixture<InscriptionsPage>;
    const navCtrl = jasmine.createSpyObj('NavController', ['navigateForward']);
    const imagePipe = jasmine.createSpyObj('ImagePipe', ['transform']);
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
                IonicModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
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
            inscriptionService.getAllForDriver = jasmine
                .createSpy()
                .and.returnValue(of(getAllForDriverResponse));
            component.getAll();
            expect(inscriptionService.getAllForDriver).toHaveBeenCalled();
            expect(component.vm.inscriptions).toEqual(getAllForDriverResponse);
        });
        it('KO', () => {
            inscriptionService.getAllForDriver = jasmine
                .createSpy()
                .and.returnValue(throwError('error'));
            component.getAll();
            expect(component.vm.loading).toBe(false);
            expect(component.vm.error).toBe(true);
        });
    });

    it('segmentChanged', () => {
        component.segmentChanged({ detail: { value: 0 } });
        expect(component.vm.header.segments.selected).toEqual(0);
    });

    it('goToTournament', () => {
        component.goToTournament(inscription);
        expect(navCtrl.navigateForward).toHaveBeenCalledWith(
            `tournament/${inscription.tournament._id}`
        );
    });
});

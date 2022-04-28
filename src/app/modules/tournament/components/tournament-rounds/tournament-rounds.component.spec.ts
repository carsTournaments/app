import { Round, Pairing } from 'src/app/models';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavController } from '@ionic/angular';
import { RoundService } from 'src/app/services';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TournamentRoundsComponent } from './tournament-rounds.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

const round = new Round({
    _id: '123',
    name: 'prueba',
    participants: 1,
    tournament: 'prueba',
    startDate: '',
    endDate: '',
    status: 'InProgress',
});
const round2 = new Round({
    _id: '1234',
    name: 'Final',
    participants: 1,
    tournament: 'prueba',
    startDate: '',
    endDate: '',
    status: 'Completed',
});
const round3 = new Round({
    _id: '1234',
    name: 'prueba2',
    participants: 1,
    tournament: 'prueba',
    startDate: '',
    endDate: '',
    status: 'Completed',
});

describe('RoundsComponent', () => {
    let component: TournamentRoundsComponent;
    let fixture: ComponentFixture<TournamentRoundsComponent>;

    const roundService = jasmine.createSpyObj('RoundService', [
        'getAllOfTournament',
    ]);
    const navCtrl = jasmine.createSpyObj('NavController', ['navigateForward']);

    roundService.getAllOfTournament = jasmine
        .createSpy()
        .and.returnValue(of([round, round2, round3]));

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TournamentRoundsComponent],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                PipesModule,
            ],
            providers: [
                { provide: RoundService, useValue: roundService },
                { provide: NavController, useValue: navCtrl },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = testbed.createComponent(TournamentRoundsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('filterRounds', () => {
        roundService.getAllOfTournament = jasmine
            .createSpy()
            .and.returnValue(of([round2]));
        component.filterRounds();
        expect(component.roundSelected).toBeDefined();
    });

    it('segmentChanged', () => {
        component.segmentChanged({ target: { value: '0' } });
        expect(component.roundSelected).toBe('0');
    });

    it('goToPairing', () => {
        const pairing = new Pairing();
        pairing._id = '1';
        component.goToPairing(pairing);
        expect(navCtrl.navigateForward).toHaveBeenCalledWith('/pairing/1');
    });
});
import { TournamentModule } from './../../tournament.module';
import { Round, Pairing } from '@models';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { RoundService } from '@services';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TournamentRoundsComponent } from './tournament-rounds.component';
import { ImagePipe } from '@pipes';
import {
    TranslateModule,
    TranslateLoader,
    TranslateFakeLoader,
} from '@ngx-translate/core';

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

describe('TournamentRoundsComponent', () => {
    let component: TournamentRoundsComponent;
    let fixture: ComponentFixture<TournamentRoundsComponent>;

    const roundService = jasmine.createSpyObj('RoundService', [
        'getAllOfTournament',
    ]);
    const navCtrl = jasmine.createSpyObj('NavController', ['navigateForward']);

    roundService.getAllOfTournament = jasmine
        .createSpy()
        .and.returnValue(of([round, round2, round3]));
    const imagePipe = jasmine.createSpyObj('ImagePipe', ['transform']);
    imagePipe.transform.and.returnValue('url');

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TournamentRoundsComponent],
            imports: [
                TournamentModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateFakeLoader,
                    },
                }),
            ],
            providers: [
                { provide: RoundService, useValue: roundService },
                { provide: NavController, useValue: navCtrl },
                { provide: ImagePipe, useValue: imagePipe },
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

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
import { of } from 'rxjs';
import { ComponentsModule } from 'src/app';
import {
    CarService,
    InscriptionService,
    TournamentService,
} from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { TournamentPage } from './tournament.page';

describe('TournamentPage', () => {
    let component: TournamentPage;
    let fixture: ComponentFixture<TournamentPage>;
    let tournamentService: TournamentService;
    let inscriptionService: InscriptionService;
    let navCtrl: NavController;
    let route: ActivatedRoute;
    let imagePipe: ImagePipe;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TournamentPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule.withRoutes([]),
                ComponentsModule,
            ],
            providers: [
                CarService,
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
            ],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = TestBed.createComponent(TournamentPage);
        component = fixture.componentInstance;
        tournamentService = testbed.inject(TournamentService);
        inscriptionService = testbed.inject(InscriptionService);
        route = testbed.inject(ActivatedRoute);
        imagePipe = testbed.inject(ImagePipe);

        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit', () => {
        spyOn(component, 'getOne');
        component.ngOnInit();
        expect(component.vm.id).toBe('1');
        expect(component.getOne).toHaveBeenCalled();
    });

    describe('getOne', () => {
        const item = new Tournament();
        item._id = '1';
        it('success', () => {
            spyOn(tournamentService, 'getOne').and.returnValue(of(item));
            component.getOne();
            expect(component.vm.tournament._id).toBe('1');
            expect(component.vm.image).toBe('assets/no-image.png');
        });
    });

    describe('getInscriptionsOfTournament', () => {
        it('OK', () => {
            spyOn(inscriptionService, 'getAllOfTournament').and.returnValue(
                of([])
            );
            component.getInscriptionsOfTournament();
            expect(component.vm.inscriptions).toEqual([]);
        });
    });

    it('segmentChanged', () => {
        component.segmentChanged({ detail: { value: 0 } });
        expect(component.vm.header.segments.selected).toBe(0);
    });
});

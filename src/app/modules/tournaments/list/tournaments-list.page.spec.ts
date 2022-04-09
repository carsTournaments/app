import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { ComponentsModule } from 'src/app/components/components.module';
import { Tournament } from 'src/app/models';
import { TournamentService } from 'src/app/services';
import { TournamentsListPage } from './tournaments-list.page';

describe('TournamentsListPage', () => {
    let component: TournamentsListPage;
    let fixture: ComponentFixture<TournamentsListPage>;
    let tournamentService: TournamentService;
    let navCtrl: NavController;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TournamentsListPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                ComponentsModule,
            ],
            providers: [TournamentService, NavController],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = TestBed.createComponent(TournamentsListPage);
        tournamentService = testbed.inject(TournamentService);
        navCtrl = testbed.inject(NavController);

        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit', () => {
        spyOn(component, 'getItems');
        component.ngOnInit();
        expect(component.getItems).toHaveBeenCalled();
    });

    describe('getItems', () => {
        it('should get all tournaments', () => {
            component.vm.header.segments.items = [
                'Proximos',
                'En curso',
                'Completados',
            ];
            spyOn(component, 'getItemsOnSuccess');
            spyOn(tournamentService, 'getAllOfAllStates').and.returnValue(
                of({
                    todo: [],
                    inProgress: [],
                    completed: [],
                })
            );
            component.getItems();
            expect(tournamentService.getAllOfAllStates).toHaveBeenCalled();
            expect(component.getItemsOnSuccess).toHaveBeenCalled();
        });
    });

    it('segmentChanged', () => {
        component.segmentChanged({ detail: { value: 0 } });
        expect(component.vm.header.segments.selected).toEqual(0);
    });

    it('goTo', () => {
        spyOn(navCtrl, 'navigateForward');
        const tournament = new Tournament();
        tournament._id = '1';
        component.goTo(tournament);
        expect(navCtrl.navigateForward).toHaveBeenCalled();
    });
});

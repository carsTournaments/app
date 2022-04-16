import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { ComponentsModule } from 'src/app/components/components.module';
import { Tournament } from 'src/app/models';
import { TournamentService } from 'src/app/services';
import { TournamentsPage } from './tournaments.page';

describe('TournamentsPage', () => {
    let component: TournamentsPage;
    let fixture: ComponentFixture<TournamentsPage>;
    const tournamentService = jasmine.createSpyObj('TournamentService', [
        'getAllOfAllStates',
        'delete',
    ]);
    const navCtrl = jasmine.createSpyObj('NavController', ['navigateForward']);

    tournamentService.getAllOfAllStates = jasmine.createSpy().and.returnValue(
        of({
            todo: [],
            inProgress: [],
            completed: [],
        })
    );

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TournamentsPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                ComponentsModule,
            ],
            providers: [
                { provide: TournamentService, useValue: tournamentService },
                { provide: NavController, useValue: navCtrl },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = testbed.createComponent(TournamentsPage);

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
        it('OK', () => {
            component.getItems();
            expect(component.vm.loading).toBe(false);
        });

        it('OK', () => {
            tournamentService.getAllOfAllStates = jasmine
                .createSpy()
                .and.returnValue(throwError({ error: 'Error' }));
            component.getItems();
            expect(component.vm.loading).toBe(false);
            expect(component.vm.error).toBe(true);
        });
    });

    it('goTo', () => {
        const tournament = new Tournament();
        tournament._id = '1';
        component.goTo(tournament);
        expect(navCtrl.navigateForward).toHaveBeenCalled();
    });
});

import { TournamentsModule } from './tournaments.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  getTestBed,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { Tournament } from '@models';
import { AnalyticsService, TournamentService } from '@services';
import {
  analyticsService,
  navCtrl,
  tournamentService,
} from '@services/services.mock.spec';
import { TournamentsPage } from './tournaments.page';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

describe('TournamentsPage', () => {
  let component: TournamentsPage;
  let fixture: ComponentFixture<TournamentsPage>;
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
      imports: [RouterTestingModule, TournamentsModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader,
        },
      }),],
      providers: [
        { provide: TournamentService, useValue: tournamentService },
        { provide: NavController, useValue: navCtrl },
        { provide: AnalyticsService, useValue: analyticsService },
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
    component.ionViewWillEnter();
    expect(component.getItems).toHaveBeenCalled();
  });

  describe('getItems', () => {
    it('OK', () => {
      component.getItems();
      expect(component.vm.loading).toBe(false);
    });

    it('KO', () => {
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
    component.goToTournament(tournament);
    expect(navCtrl.navigateForward).toHaveBeenCalled();
  });

  it('doRefresh', () => {
    spyOn(component, 'getItems');
    component.doRefresh({});
    expect(component.getItems).toHaveBeenCalled();
  });
});

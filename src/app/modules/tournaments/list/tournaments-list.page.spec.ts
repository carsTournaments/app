import {
    ComponentFixture,
    getTestBed,
    TestBed,
    waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { TournamentService, AuthService } from 'src/app/services';

import { TournamentsListPage } from './tournaments-list.page';

describe('TournamentsListPage', () => {
    let component: TournamentsListPage;
    let fixture: ComponentFixture<TournamentsListPage>;
    let tournamentService: TournamentService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TournamentsListPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                ComponentsModule,
            ],
            providers: [TournamentService],
        }).compileComponents();

        const testbed = getTestBed();
        fixture = TestBed.createComponent(TournamentsListPage);
        tournamentService = testbed.inject(TournamentService);

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
});

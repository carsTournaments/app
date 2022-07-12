import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TournamentService } from '../..';
import { Inscription } from '@models';
import { environment } from '@env/environment';

const item = new Inscription();

describe('TournamentService', () => {
    let httpTestingController: HttpTestingController;
    let service: TournamentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TournamentService],
            imports: [HttpClientTestingModule],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(TournamentService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getAllOfAllStates', () => {
        service.getAllOfAllStates().subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/tournaments/getAllOfAllStates`
        );
        req.flush(item);
    });

    it('getDaysForCalendar', () => {
        service.getDaysForCalendar().subscribe((response) => {
            expect(response).not.toBe(null);
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/tournaments/getDaysForCalendar`
        );
        req.flush(item);
    });

    it('getCalendarItems', () => {
        service.getCalendarItems('2022-10-01').subscribe((response) => {
            expect(response).not.toBe(null);
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/tournaments/getCalendarItems`
        );
        req.flush(item);
    });

    it('getOne', () => {
        service.getOne('1').subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/tournaments/getOne`
        );
        req.flush(item);
    });
});

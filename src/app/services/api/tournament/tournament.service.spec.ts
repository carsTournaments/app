import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TournamentService } from '../..';
import { Inscription } from 'src/app/models';
import { environment } from 'src/environments/environment';

// const paginator: PaginatorI = {
//     pageSize: 0,
//     currentPage: 0,
//     totalPages: 0,
//     total: 0,
// };

const item = new Inscription();
// const res = {
//     items: [item],
//     paginator,
// };

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
            `${environment.urlApi}/tournaments/allOfAllStates`
        );
        req.flush(item);
    });

    it('getOne', () => {
        service.getOne('1').subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/tournaments/one`
        );
        req.flush(item);
    });
});

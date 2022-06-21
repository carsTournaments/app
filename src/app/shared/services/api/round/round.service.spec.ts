import { Round } from '@models/round.model';
import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { RoundService } from '../..';
import { PaginatorI } from '@interfaces';
import { RoundGetAllDto } from './round.dto';
import { environment } from '@env/environment';

const paginator: PaginatorI = {
    pageSize: 0,
    currentPage: 0,
    totalPages: 0,
    total: 0,
};

const item = new Round();
const responsePaginator = {
    items: [item],
    paginator,
};

describe('RoundService', () => {
    let httpTestingController: HttpTestingController;
    let service: RoundService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RoundService],
            imports: [HttpClientTestingModule],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(RoundService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getAllOfTournament', () => {
        service.getAllOfTournament({ id: '1' }).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(
                JSON.stringify(responsePaginator)
            );
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/rounds/allOfTournament`
        );
        req.flush(responsePaginator);
    });

    it('getOne', () => {
        service.getOne('1').subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/rounds/one`
        );
        req.flush(item);
    });
});

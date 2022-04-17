import { environment } from 'src/environments/environment';
import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { InscriptionService } from '../..';
import { Pairing, Inscription } from 'src/app/models';
import {
    InscriptionGetAllDto,
    InscriptionsGetMyCarsForInscriptionDto,
} from './inscription.dto';
import { PaginatorI } from 'src/app/interfaces/paginator.interface';

const paginator: PaginatorI = {
    pageSize: 0,
    currentPage: 0,
    totalPages: 0,
    total: 0,
};

const item = new Inscription();
const res = {
    items: [item],
    paginator,
};

describe('InscriptionService', () => {
    let httpTestingController: HttpTestingController;
    let service: InscriptionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [InscriptionService],
            imports: [HttpClientTestingModule],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(InscriptionService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getAll', () => {
        const data: InscriptionGetAllDto = {
            page: 1,
            pageSize: 1,
            site: 'app',
            order: [],
        };
        service.getAll(data).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(res));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/inscriptions/all`
        );
        req.flush(res);
    });

    it('getAllOfTournament', () => {
        service.getAllOfTournament({ id: '1' }).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/inscriptions/allOfTournament`
        );
        req.flush([]);
    });

    it('getAllOfCar', () => {
        service.getAllOfCar({ id: '1' }).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/inscriptions/allOfCar`
        );
        req.flush([]);
    });

    it('getAllForDriver', () => {
        service.getAllForDriver({ id: '1' }).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/inscriptions/allForDriver`
        );
        req.flush([]);
    });

    it('getMyCarsForInscription', () => {
        const data: InscriptionsGetMyCarsForInscriptionDto = {
            userId: '',
            tournamentId: '',
        };
        service.getMyCarsForInscription(data).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/inscriptions/getMyCarsForInscription`
        );
        req.flush([]);
    });

    it('getOne', () => {
        service.getOne('1').subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/inscriptions/one`
        );
        req.flush(item);
    });

    it('create', () => {
        service.create(item).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/inscriptions/create`
        );
        req.flush(item);
    });

    it('deleteOne', () => {
        service.deleteOne('11').subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/inscriptions/one/11`
        );
        req.flush(item);
    });

    it('deleteByCarAndTournament', () => {
        service
            .deleteByCarAndTournament({ carId: '11', tournamentId: '11' })
            .subscribe((response) => {
                expect(response).not.toBe(null);
                expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
            });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/inscriptions/oneByCarAndTournament/11/11`
        );
        req.flush(item);
    });
});
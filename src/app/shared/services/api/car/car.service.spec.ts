import { environment } from '@env/environment';
import { PaginatorI } from '@interfaces';
import { CarGetAllDto } from '@services/api/car/car.dto';
import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { CarService } from '../..';
import { Car } from '@models';

const paginator: PaginatorI = {
    pageSize: 0,
    currentPage: 0,
    totalPages: 0,
    total: 0,
};

const item = new Car();
const res = {
    items: [item],
    paginator,
};

describe('CarService', () => {
    let httpTestingController: HttpTestingController;
    let service: CarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CarService],
            imports: [HttpClientTestingModule],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(CarService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getAll', () => {
        const data: CarGetAllDto = {
            page: 0,
            pageSize: 0,
            site: 'app',
            order: [],
            onlyWithPhoto: false,
        };
        service.getAll(data).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(res));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/cars/getAll`
        );
        req.flush(res);
    });

    // it('getAllOffBrand', () => {
    //     service.getAllOffBrand({ id: '1', limit: '10' }).subscribe((response) => {
    //         expect(response).not.toBe(null);
    //         expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
    //     });
    //     const req = httpTestingController.expectOne(
    //         `${environment.urlApi}/cars/allOfBrand`
    //     );
    //     req.flush([]);
    // });

    it('getAllOfDriver', () => {
        service.getAllOfDriver({ id: '1' }).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/cars/getAllOfDriver`
        );
        req.flush([]);
    });

    it('getOne', () => {
        service.getOne('1').subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/cars/one`
        );
        req.flush(item);
    });

    it('create', () => {
        service.create(item).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/cars/create`
        );
        req.flush(item);
    });

    it('update', () => {
        service.update(item).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/cars/update`
        );
        req.flush(item);
    });

    it('delete', () => {
        service.delete('1').subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/cars/one/1`
        );
        req.flush(item);
    });
});

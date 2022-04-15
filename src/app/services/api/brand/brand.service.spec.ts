import { environment } from 'src/environments/environment';
import { PaginatorI } from 'src/app/interfaces/paginator.interface';
import { CarGetAllDto } from 'src/app/services/api/car/car.dto';
import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { BrandService } from '../..';
import { Car, Brand } from 'src/app/models';
import { BrandGetAllBrandsAndCarsDto } from './brand.dto';

const paginator: PaginatorI = {
    pageSize: 0,
    currentPage: 0,
    totalPages: 0,
    total: 0,
};

const item = new Brand();
const responsePaginator = {
    items: [item],
    paginator,
};

describe('BrandService', () => {
    let httpTestingController: HttpTestingController;
    let service: BrandService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BrandService],
            imports: [HttpClientTestingModule],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(BrandService);
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
        };
        service.getAll(data).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(
                JSON.stringify(responsePaginator)
            );
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/brands/all`
        );
        req.flush(responsePaginator);
    });

    it('getAllBrandsAndCars', () => {
        const data: BrandGetAllBrandsAndCarsDto = {
            page: 1,
            pageSize: 1,
            order: [],
        };
        service.getAllBrandsAndCars(data).subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(
                JSON.stringify(responsePaginator)
            );
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/brands/allOfAllBrandsAndCarsBrand`
        );
        req.flush(responsePaginator);
    });

    it('getOne', () => {
        service.getOne('1').subscribe((response) => {
            expect(response).not.toBe(null);
            expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
        });
        const req = httpTestingController.expectOne(
            `${environment.urlApi}/brands/one`
        );
        req.flush(item);
    });
});

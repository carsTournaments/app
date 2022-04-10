import { BrandGetAllBrandsAndCarsDto, BrandGetAllDto } from './brand.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Brand } from 'src/app/models/brand.model';
import { PaginatorI } from 'src/app/interfaces/paginator.interface';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BrandService {
    url = `${environment.urlApi}/brands`;
    constructor(private httpClient: HttpClient) {}

    getAll(
        data: BrandGetAllDto
    ): Observable<{ items: Brand[]; paginator: PaginatorI }> {
        return this.httpClient
            .post<{ items: Brand[]; paginator: PaginatorI }>(
                `${this.url}/all`,
                data
            )
            .pipe(take(1));
    }

    getAllBrandsAndCars(
        data: BrandGetAllBrandsAndCarsDto
    ): Observable<{ items: Brand[]; paginator: PaginatorI }> {
        return this.httpClient
            .post<{ items: Brand[]; paginator: PaginatorI }>(
                `${this.url}/allOfAllBrandsAndCarsBrand`,
                data
            )
            .pipe(take(1));
    }

    getOne(id: string): Observable<Brand> {
        return this.httpClient
            .post<Brand>(`${this.url}/one`, { id, site: 'app' })
            .pipe(take(1));
    }
}

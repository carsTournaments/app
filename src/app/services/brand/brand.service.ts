import { PaginatorI } from './../../interfaces/paginator.interface';
import { BrandGetAllBrandsAndCarsDto, BrandGetAllDto } from './brand.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Brand } from 'src/app/models/brand.model';

@Injectable({ providedIn: 'root' })
export class BrandService {
  url = `${environment.urlApi}/brands`;
  headers = { headers: this.httpService.getHeaderWithToken() };
  constructor(
    private httpClient: HttpClient,
    private httpService: HttpService
  ) {}

  getAll(
    data: BrandGetAllDto
  ): Observable<{ items: Brand[]; paginator: PaginatorI }> {
    return this.httpClient.post<{ items: Brand[]; paginator: PaginatorI }>(
      `${this.url}/all`,
      data,
      this.headers
    );
  }

  getAllBrandsAndCars(data: BrandGetAllBrandsAndCarsDto): Observable<{ items: Brand[]; paginator: PaginatorI }> {
    return this.httpClient.post<{ items: Brand[]; paginator: PaginatorI }>(
      `${this.url}/allOfAllBrandsAndCarsBrand`,
      data,
      this.headers
    );
  }

  getOne(id: string): Observable<Brand> {
    return this.httpClient.post<Brand>(
      `${this.url}/one`,
      { id, site: 'admin' },
      this.headers
    );
  }

}

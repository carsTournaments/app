import { IdDto } from 'src/app/core/dtos/id.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { CarGetAllDto } from './car.dto';
import { Car } from 'src/app/models/car.model';
import { PaginatorI } from 'src/app/interfaces/paginator.interface';
import { HttpService } from '../../http/http.service';

@Injectable({ providedIn: 'root' })
export class CarService {
  url = `${environment.urlApi}/cars`;
  headers = { headers: this.httpService.getHeaderWithToken() };
  constructor(
    private httpClient: HttpClient,
    private httpService: HttpService
  ) {}

  getAll(
    data: CarGetAllDto
  ): Observable<{ items: Car[]; paginator: PaginatorI }> {
    return this.httpClient.post<{ items: Car[]; paginator: PaginatorI }>(
      `${this.url}/all`,
      data,
      this.headers
    );
  }

  getAllOffBrand(data: IdDto): Observable<Car[]> {
    return this.httpClient.post<Car[]>(
      `${this.url}/allOfBrand`,
      data,
      this.headers
    );
  }

  getAllOfDriver(data: IdDto): Observable<Car[]> {
    return this.httpClient.post<Car[]>(
      `${this.url}/allOfDriver`,
      data,
      this.headers
    );
  }

  getOne(id: string): Observable<Car> {
    return this.httpClient.post<Car>(
      `${this.url}/one`,
      { id, site: 'admin' },
      this.headers
    );
  }

}

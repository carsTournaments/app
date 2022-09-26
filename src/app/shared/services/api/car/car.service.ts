import { IdDto } from '@core/dtos/id.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { CarGetAllDto, CarGetGlobalRankingDto } from './car.dto';
import { Car } from '@models';
import { CarRankingI, PaginatorI } from '@interfaces';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CarService {
  url = `${environment.urlApi}/cars`;
  constructor(private httpClient: HttpClient) {}

  getAll(
    data: CarGetAllDto
  ): Observable<{ items: Car[]; paginator: PaginatorI }> {
    return this.httpClient
      .post<{ items: Car[]; paginator: PaginatorI }>(`${this.url}/getAll`, data)
      .pipe(take(1));
  }

  getAllDriverCars(data: IdDto): Observable<Car[]> {
    return this.httpClient
      .post<Car[]>(`${this.url}/getAllDriverCars`, data)
      .pipe(take(1));
  }

  getGlobalRanking(data: CarGetGlobalRankingDto): Observable<CarRankingI[]> {
    return this.httpClient
      .post<CarRankingI[]>(`${this.url}/getGlobalRanking`, data)
      .pipe(take(1));
  }

  getOne(id: string): Observable<Car> {
    return this.httpClient
      .post<Car>(`${this.url}/one`, { id, site: 'app' })
      .pipe(take(1));
  }

  create(data: Car): Observable<Car> {
    return this.httpClient.post<Car>(`${this.url}/create`, data).pipe(take(1));
  }

  update(data: Car): Observable<Car> {
    return this.httpClient.put<Car>(`${this.url}/update`, data).pipe(take(1));
  }

  delete(id: string): Observable<Car> {
    return this.httpClient.delete<Car>(`${this.url}/one/${id}`).pipe(take(1));
  }
}

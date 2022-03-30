import { IdDto } from 'src/app/core/dtos/id.dto';
import { PaginatorI } from './../../interfaces/paginator.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { CarCreateFakeDto, CarGetAllDto } from './car.dto';
import { Car } from 'src/app/models/car.model';

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

  create(data: Car): Observable<Car> {
    return this.httpClient.post<Car>(`${this.url}/create`, data, this.headers);
  }

  createFake(data: CarCreateFakeDto): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      `${this.url}/createFake`,
      data,
      this.headers
    );
  }

  update(data: Car): Observable<Car> {
    return this.httpClient.put<Car>(`${this.url}/update`, data, this.headers);
  }

  delete(id: string): Observable<Car> {
    return this.httpClient.delete<Car>(`${this.url}/one/${id}`, this.headers);
  }

  deleteAllFake(): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(
      `${this.url}/allFake`,
      this.headers
    );
  }
}

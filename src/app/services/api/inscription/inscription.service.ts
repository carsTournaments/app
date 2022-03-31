import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { InscriptionCreateDto, InscriptionGetAllDto } from './inscription.dto';
import { Inscription } from 'src/app/models/inscription.model';
import { IdDto } from 'src/app/core/dtos/id.dto';
import { PaginatorI } from 'src/app/interfaces/paginator.interface';
import { HttpService } from '../../http/http.service';

@Injectable({ providedIn: 'root' })
export class InscriptionService {
  url = `${environment.urlApi}/inscriptions`;
  headers = { headers: this.httpService.getHeaderWithToken() };
  constructor(
    private httpClient: HttpClient,
    private httpService: HttpService
  ) {}

  getAll(
    data: InscriptionGetAllDto
  ): Observable<{ items: Inscription[]; paginator: PaginatorI }> {
    return this.httpClient.post<{
      items: Inscription[];
      paginator: PaginatorI;
    }>(`${this.url}/all`, data, this.headers);
  }

  getAllOfTournament(data: IdDto): Observable<Inscription[]> {
    return this.httpClient.post<Inscription[]>(
      `${this.url}/allOfTournament`,
      data,
      this.headers
    );
  }

  getAllOfCar(data: IdDto): Observable<Inscription[]> {
    return this.httpClient.post<Inscription[]>(
      `${this.url}/allOfCar`,
      data,
      this.headers
    );
  }

  getOne(id: string): Observable<Inscription> {
    return this.httpClient.post<Inscription>(
      `${this.url}/one`,
      { id, site: 'admin' },
      this.headers
    );
  }

  create(data: InscriptionCreateDto): Observable<Inscription> {
    return this.httpClient.post<Inscription>(
      `${this.url}/create`,
      data,
      this.headers
    );
  }

  deleteOne(id: string): Observable<Inscription> {
    return this.httpClient.delete<Inscription>(
      `${this.url}/one/${id}`,
      this.headers
    );
  }

}

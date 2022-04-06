import { IdDto } from 'src/app/core/dtos/id.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Round } from 'src/app/models/round.model';
import { RoundGetAllDto } from './round.dto';
import { PaginatorI } from 'src/app/interfaces/paginator.interface';
import { HttpService } from '../../http/http.service';
import { take } from 'rxjs/internal/operators/take';

@Injectable({ providedIn: 'root' })
export class RoundService {
    url = `${environment.urlApi}/rounds`;
    headers = { headers: this.httpService.getHeaderWithToken() };
    constructor(
        private httpClient: HttpClient,
        private httpService: HttpService
    ) {}

    getAll(
        body: RoundGetAllDto
    ): Observable<{ items: Round[]; paginator: PaginatorI }> {
        return this.httpClient
            .post<{ items: Round[]; paginator: PaginatorI }>(
                `${this.url}/all`,
                body,
                this.headers
            )
            .pipe(take(1));
    }

    getAllOfTournament(data: IdDto): Observable<Round[]> {
        return this.httpClient
            .post<Round[]>(`${this.url}/allOfTournament`, data, this.headers)
            .pipe(take(1));
    }

    getOne(id: string): Observable<Round> {
        return this.httpClient
            .post<Round>(`${this.url}/one`, { id, site: 'admin' }, this.headers)
            .pipe(take(1));
    }
}

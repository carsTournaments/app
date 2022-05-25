import { IdDto } from '@core/dtos/id.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Round } from '@models/round.model';
import { RoundGetAllDto } from './round.dto';
import { PaginatorI } from '@interfaces/paginator.interface';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoundService {
    url = `${environment.urlApi}/rounds`;
    constructor(private httpClient: HttpClient) {}

    getAll(
        body: RoundGetAllDto
    ): Observable<{ items: Round[]; paginator: PaginatorI }> {
        return this.httpClient
            .post<{ items: Round[]; paginator: PaginatorI }>(
                `${this.url}/getAll`,
                body
            )
            .pipe(take(1));
    }

    getAllOfTournament(data: IdDto): Observable<Round[]> {
        return this.httpClient
            .post<Round[]>(`${this.url}/allOfTournament`, data)
            .pipe(take(1));
    }

    getOne(id: string): Observable<Round> {
        return this.httpClient
            .post<Round>(`${this.url}/one`, { id, site: 'app' })
            .pipe(take(1));
    }
}

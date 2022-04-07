import { PaginatorI } from '../../../interfaces/paginator.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { TournamentGetAllDto } from './tournament.dto';
import { Tournament } from 'src/app/models/tournament.model';
import { take } from 'rxjs/internal/operators/take';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    url = `${environment.urlApi}/tournaments`;
    headers = { headers: null };
    constructor(private httpClient: HttpClient) {}

    getAll(
        data: TournamentGetAllDto
    ): Observable<{ items: Tournament[]; paginator: PaginatorI }> {
        return this.httpClient
            .post<{
                items: Tournament[];
                paginator: PaginatorI;
            }>(`${this.url}/all`, data)
            .pipe(take(1));
    }

    getOne(id: string): Observable<Tournament> {
        return this.httpClient
            .post<Tournament>(`${this.url}/one`, { id, site: 'admin' })
            .pipe(take(1));
    }
}

import { PaginatorI } from '../../../interfaces/paginator.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { TournamentGetAllDto } from './tournament.dto';
import { Tournament } from 'src/app/models/tournament.model';
import { take } from 'rxjs/internal/operators/take';
import { TournamentGetAllOfAllStatesResponse } from './tournament.responses';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    url = `${environment.urlApi}/tournaments`;
    headers = { headers: null };
    constructor(private httpClient: HttpClient) {}

    getAllOfAllStates(): Observable<TournamentGetAllOfAllStatesResponse> {
        return this.httpClient
            .post<TournamentGetAllOfAllStatesResponse>(
                `${this.url}/allOfAllStates`,
                null
            )
            .pipe(take(1));
    }

    getOne(id: string): Observable<Tournament> {
        return this.httpClient
            .post<Tournament>(`${this.url}/one`, { id, site: 'admin' })
            .pipe(take(1));
    }
}

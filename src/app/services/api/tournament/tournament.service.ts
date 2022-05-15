import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Tournament } from 'src/app/models/tournament.model';
import { take } from 'rxjs/operators';
import { TournamentGetAllOfAllStatesResponse } from './tournament.responses';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    url = `${environment.urlApi}/tournaments`;
    constructor(private httpClient: HttpClient) {}

    getAllOfAllStates(): Observable<TournamentGetAllOfAllStatesResponse> {
        return this.httpClient
            .post<TournamentGetAllOfAllStatesResponse>(
                `${this.url}/getAllOfAllStates`,
                null
            )
            .pipe(take(1));
    }

    getOne(id: string): Observable<Tournament> {
        return this.httpClient
            .post<Tournament>(`${this.url}/getOne`, { id, site: 'app' })
            .pipe(take(1));
    }
}

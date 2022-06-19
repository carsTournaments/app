import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Tournament } from '@models/tournament.model';
import { take } from 'rxjs/operators';
import { TournamentGetAllOfAllStatesResponse } from './tournament.responses';
import { Round } from '@models';

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

    getDaysForCalendar(): Observable<string[]> {
        return this.httpClient
            .post<string[]>(`${this.url}/getDaysForCalendar`, null)
            .pipe(take(1));
    }

    getCalendarItems(
        date: string
    ): Observable<{ rounds: Round[]; tournaments: Tournament[] }> {
        return this.httpClient
            .post<{ rounds: Round[]; tournaments: Tournament[] }>(
                `${this.url}/getCalendarItems`,
                { date }
            )
            .pipe(take(1));
    }

    getOne(id: string): Observable<Tournament> {
        return this.httpClient
            .post<Tournament>(`${this.url}/getOne`, { id, site: 'app' })
            .pipe(take(1));
    }
}

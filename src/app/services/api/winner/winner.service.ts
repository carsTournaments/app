import { IdDto } from './../../../core/dtos/id.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WinnerGetOfTournamentComplete } from './winner.responses';

@Injectable({ providedIn: 'root' })
export class WinnerService {
    url = `${environment.urlApi}/winners`;
    constructor(private httpClient: HttpClient) {}

    getForTournamentComplete(
        data: IdDto
    ): Observable<WinnerGetOfTournamentComplete> {
        return this.httpClient
            .post<WinnerGetOfTournamentComplete>(
                `${this.url}/forTournamentComplete`,
                data
            )
            .pipe(take(1));
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '@env/environment';
import {
  WinnerGetAllUserWinnersI,
  WinnerGetOfTournamentCompleteResponse,
} from './winner.responses';
import { IdDto } from '@core/dtos/id.dto';

@Injectable({ providedIn: 'root' })
export class WinnerService {
  url = `${environment.urlApi}/winners`;
  constructor(private httpClient: HttpClient) {}

  getForTournamentComplete(
    data: IdDto
  ): Observable<WinnerGetOfTournamentCompleteResponse> {
    return this.httpClient
      .post<WinnerGetOfTournamentCompleteResponse>(
        `${this.url}/forTournamentComplete`,
        data
      )
      .pipe(take(1));
  }

  getAllUserWinners(data: IdDto): Observable<WinnerGetAllUserWinnersI[]> {
    return this.httpClient
      .post<WinnerGetAllUserWinnersI[]>(`${this.url}/getAllUserWinners`, data)
      .pipe(take(1));
  }
}

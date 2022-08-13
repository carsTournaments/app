import { IdDto } from '@core/dtos/id.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Round } from '@models/round.model';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoundService {
  url = `${environment.urlApi}/rounds`;
  constructor(private httpClient: HttpClient) {}

  getAllTournamentRounds(data: IdDto): Observable<Round[]> {
    return this.httpClient
      .post<Round[]>(`${this.url}/getAllTournamentRounds`, data)
      .pipe(take(1));
  }

  getOne(id: string): Observable<Round> {
    return this.httpClient
      .post<Round>(`${this.url}/one`, { id, site: 'app' })
      .pipe(take(1));
  }
}

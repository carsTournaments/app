import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Report } from 'src/app/models/report.model';
import { take } from 'rxjs/operators';
import { IdDto } from 'src/app/core/dtos/id.dto';

@Injectable({ providedIn: 'root' })
export class ReportService {
    url = `${environment.urlApi}/reports`;
    constructor(private httpClient: HttpClient) {}

    getAllOfRound(data: IdDto): Observable<Report[]> {
        return this.httpClient
            .post<Report[]>(`${this.url}/allOfRound`, data)
            .pipe(take(1));
    }

    getAllOfTournament(data: IdDto): Observable<Report[]> {
        return this.httpClient
            .post<Report[]>(`${this.url}/allOfTournament`, data)
            .pipe(take(1));
    }

    create(data: Report): Observable<Report> {
        return this.httpClient
            .post<Report>(`${this.url}/create`, data)
            .pipe(take(1));
    }
}

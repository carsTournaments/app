import { PaginatorI } from '../../../interfaces/paginator.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../http/http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { TournamentGetAllDto } from './tournament.dto';
import { Tournament } from 'src/app/models/tournament.model';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    url = `${environment.urlApi}/tournaments`;
    headers = { headers: this.httpService.getHeaderWithToken() };
    constructor(
        private httpClient: HttpClient,
        private httpService: HttpService
    ) {}

    getAll(
        data: TournamentGetAllDto
    ): Observable<{ items: Tournament[]; paginator: PaginatorI }> {
        return this.httpClient.post<{
            items: Tournament[];
            paginator: PaginatorI;
        }>(`${this.url}/all`, data, this.headers);
    }

    getOne(id: string): Observable<Tournament> {
        return this.httpClient.post<Tournament>(
            `${this.url}/one`,
            { id, site: 'admin' },
            this.headers
        );
    }
}

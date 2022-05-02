import { InscriptionGetMyCarsUserForInscriptionResponse } from './inscription.responses';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import {
    InscriptionCreateDto,
    InscriptionGetAllDto,
    InscriptionsGetMyCarsForInscriptionDto,
} from './inscription.dto';
import { Car, Inscription, Tournament } from 'src/app/models';
import { IdDto } from 'src/app/core/dtos/id.dto';
import { PaginatorI } from 'src/app/interfaces/paginator.interface';
import { take } from 'rxjs/operators';
import { InscriptionGetAllForDriverI } from 'src/app/interfaces/inscription.interface';

@Injectable({ providedIn: 'root' })
export class InscriptionService {
    url = `${environment.urlApi}/inscriptions`;
    constructor(private httpClient: HttpClient) {}

    getAll(
        data: InscriptionGetAllDto
    ): Observable<{ items: Inscription[]; paginator: PaginatorI }> {
        return this.httpClient
            .post<{
                items: Inscription[];
                paginator: PaginatorI;
            }>(`${this.url}/getAll`, data)
            .pipe(take(1));
    }

    getAllOfTournament(data: IdDto): Observable<Inscription[]> {
        return this.httpClient
            .post<Inscription[]>(`${this.url}/getAllOfTournament`, data)
            .pipe(take(1));
    }

    getAllOfCar(data: IdDto): Observable<Inscription[]> {
        return this.httpClient
            .post<Inscription[]>(`${this.url}/getAllOfCar`, data)
            .pipe(take(1));
    }

    getAllForDriver(data: IdDto): Observable<InscriptionGetAllForDriverI> {
        return this.httpClient
            .post<InscriptionGetAllForDriverI>(
                `${this.url}/getAllForDriver`,
                data
            )
            .pipe(take(1));
    }

    getMyCarsForInscription(
        data: InscriptionsGetMyCarsForInscriptionDto
    ): Observable<InscriptionGetMyCarsUserForInscriptionResponse> {
        return this.httpClient
            .post<InscriptionGetMyCarsUserForInscriptionResponse>(
                `${this.url}/getMyCarsForInscription`,
                data
            )
            .pipe(take(1));
    }

    getOne(id: string): Observable<Inscription> {
        return this.httpClient
            .post<Inscription>(`${this.url}/getOne`, { id, site: 'app' })
            .pipe(take(1));
    }

    create(data: InscriptionCreateDto): Observable<Inscription> {
        return this.httpClient
            .post<Inscription>(`${this.url}/create`, data)
            .pipe(take(1));
    }

    deleteOne(id: string): Observable<Inscription> {
        return this.httpClient
            .delete<Inscription>(`${this.url}/one/${id}`)
            .pipe(take(1));
    }

    deleteByCarAndTournament({
        carId,
        tournamentId,
    }: {
        carId: string;
        tournamentId: string;
    }): Observable<Inscription> {
        return this.httpClient
            .delete<Inscription>(
                `${this.url}/oneByCarAndTournament/${carId}/${tournamentId}`
            )
            .pipe(take(1));
    }
}

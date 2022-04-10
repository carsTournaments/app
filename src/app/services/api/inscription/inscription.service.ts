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
import { take } from 'rxjs/internal/operators/take';

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
            }>(`${this.url}/all`, data)
            .pipe(take(1));
    }

    getAllOfTournament(data: IdDto): Observable<Inscription[]> {
        return this.httpClient
            .post<Inscription[]>(`${this.url}/allOfTournament`, data)
            .pipe(take(1));
    }

    getAllOfCar(data: IdDto): Observable<Inscription[]> {
        return this.httpClient
            .post<Inscription[]>(`${this.url}/allOfCar`, data)
            .pipe(take(1));
    }

    getAllForDriver(data: IdDto): Observable<{
        todo: { car: Car; tournament: Tournament }[];
        inProgress: { car: Car; tournament: Tournament }[];
        completed: { car: Car; tournament: Tournament }[];
    }> {
        return this.httpClient
            .post<{
                todo: { car: Car; tournament: Tournament }[];
                inProgress: { car: Car; tournament: Tournament }[];
                completed: { car: Car; tournament: Tournament }[];
            }>(`${this.url}/allForDriver`, data)
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
            .post<Inscription>(`${this.url}/one`, { id, site: 'app' })
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

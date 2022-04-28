import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaginatorI } from 'src/app/interfaces/paginator.interface';
import { LikeGetAllDto } from './like.dto';
import { Like } from 'src/app/models/like.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LikeGetAllReceivedForUserResponse } from './like.response';
import { IdDto } from 'src/app/core/dtos/id.dto';

@Injectable({ providedIn: 'root' })
export class LikeService {
    url = `${environment.urlApi}/likes`;
    constructor(private httpClient: HttpClient) {}

    getAll(
        data: LikeGetAllDto
    ): Observable<{ items: Like[]; paginator: PaginatorI }> {
        return this.httpClient
            .post<{ items: Like[]; paginator: PaginatorI }>(
                `${this.url}/getAll`,
                data
            )
            .pipe(take(1));
    }

    getAllReceivedForUser(
        data: IdDto
    ): Observable<LikeGetAllReceivedForUserResponse[]> {
        return this.httpClient
            .post<LikeGetAllReceivedForUserResponse[]>(
                `${this.url}/getAllReceivedForUser`,
                data
            )
            .pipe(take(1));
    }

    getAllSentForUser(data: IdDto): Observable<Like[]> {
        return this.httpClient
            .post<Like[]>(`${this.url}/getAllSentForUser`, data)
            .pipe(take(1));
    }

    create(data: Like): Observable<Like> {
        return this.httpClient
            .post<Like>(`${this.url}/create`, data)
            .pipe(take(1));
    }

    deleteByCarId(id: string): Observable<Like> {
        return this.httpClient
            .delete<Like>(`${this.url}/byCarId/${id}`)
            .pipe(take(1));
    }
}

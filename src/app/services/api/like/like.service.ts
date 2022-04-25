import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaginatorI } from 'src/app/interfaces/paginator.interface';
import { LikeGetAllDto } from './like.dto';
import { Like } from 'src/app/models/like.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

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

    create(data: Like): Observable<Like> {
        return this.httpClient
            .post<Like>(`${this.url}/create`, data)
            .pipe(take(1));
    }
}

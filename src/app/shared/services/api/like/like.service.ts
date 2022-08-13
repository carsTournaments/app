import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { PaginatorI } from '@interfaces';
import { LikeGetAllDto, LikeGetAllOfCarDto } from './like.dto';
import { Like } from '@models/like.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LikeGetAllReceivedForUserResponse } from './like.response';
import { IdDto } from '@core/dtos/id.dto';
import { StorageService } from '@services';

@Injectable({ providedIn: 'root' })
export class LikeService {
  url = `${environment.urlApi}/likes`;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

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

  getAllUserSubmittedLikes(data: IdDto): Observable<Like[]> {
    return this.httpClient
      .post<Like[]>(`${this.url}/getAllUserSubmittedLikes`, data)
      .pipe(take(1));
  }

  getAllCarLikes(data: LikeGetAllOfCarDto): Observable<Like[]> {
    return this.httpClient
      .post<Like[]>(`${this.url}/getAllCarLikes`, data)
      .pipe(take(1));
  }

  create(data: Like): Observable<Like> {
    return this.httpClient.post<Like>(`${this.url}/create`, data).pipe(take(1));
  }

  deleteByCarId(id: string): Observable<Like> {
    return this.httpClient
      .delete<Like>(`${this.url}/byCarId/${id}`)
      .pipe(take(1));
  }
}

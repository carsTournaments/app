import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '@models';
import { environment } from '@env/environment';
import { UserGetResumeResponse } from './user.responses';

@Injectable({ providedIn: 'root' })
export class UserService {
    url = `${environment.urlApi}/users`;
    constructor(private httpClient: HttpClient) {}

    getResume(): Observable<UserGetResumeResponse> {
        return this.httpClient
            .post<UserGetResumeResponse>(`${this.url}/getResume`, null)
            .pipe(take(1));
    }

    update(data: User): Observable<User> {
        return this.httpClient
            .put<User>(`${this.url}/update`, data)
            .pipe(take(1));
    }
}

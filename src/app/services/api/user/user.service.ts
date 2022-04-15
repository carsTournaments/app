import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
}

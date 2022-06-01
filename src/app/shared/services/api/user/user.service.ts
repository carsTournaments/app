import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share, take } from 'rxjs/operators';
import { User } from '@models';
import { UserGetResumeResponse } from './user.responses';
import { LocalStorageService } from '@services/various/local-storage.service';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    private change$ = new BehaviorSubject<User | undefined>(undefined);
    private _user?: User;
    private path = `${environment.urlApi}/users`;
    constructor(
        private httpClient: HttpClient,
        private localStorageService: LocalStorageService
    ) {}

    getResume(): Observable<UserGetResumeResponse> {
        return this.httpClient
            .post<UserGetResumeResponse>(`${this.path}/getResume`, null)
            .pipe(take(1));
    }

    update(data: User): Observable<User> {
        return this.httpClient
            .put<User>(`${this.path}/update`, data)
            .pipe(take(1));
    }

    private get user(): User | undefined {
        this._user = this.localStorageService.get('user')
            ? JSON.parse(this.localStorageService.get('user'))
            : undefined;
        return this._user;
    }

    change(): Observable<User | undefined> {
        return this.change$.pipe(share());
    }

    getUser(): User {
        return this.user;
    }

    set(user?: User): UserService {
        this.save(user);
        return this;
    }

    clear(): void {
        this.save();
    }

    private save(user?: User): void {
        this._user = undefined;
        if (!user) {
            this.localStorageService.remove('user');
        } else {
            this.localStorageService.set('user', JSON.stringify(user));
            this._user = user;
        }
        this.change$.next(user);
    }
}

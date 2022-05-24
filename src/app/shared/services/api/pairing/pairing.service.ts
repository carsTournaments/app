import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';
import { Pairing } from '@models';

@Injectable({ providedIn: 'root' })
export class PairingService {
    url = `${environment.urlApi}/pairings`;
    headers = { headers: null };
    constructor(private httpClient: HttpClient) {}

    getOne(id: string): Observable<Pairing> {
        return this.httpClient
            .post<Pairing>(`${this.url}/one`, { id, site: 'app' })
            .pipe(take(1));
    }
}

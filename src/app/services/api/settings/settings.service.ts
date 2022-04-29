import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SettingsCheckUpdateDto } from './settings.dto';
import { VersionSettingsI } from './settings.response';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    url = `${environment.urlApi}/settings`;
    constructor(private httpClient: HttpClient) {}

    checkUpdate(data: SettingsCheckUpdateDto): Observable<VersionSettingsI> {
        return this.httpClient
            .post<VersionSettingsI>(`${this.url}/checkUpdate`, data)
            .pipe(take(1));
    }
}

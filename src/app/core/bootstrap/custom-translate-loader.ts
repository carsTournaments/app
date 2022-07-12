import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
    contentHeader = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    });

    constructor(private http: HttpClient) {}
    getTranslation(lang: string): Observable<any> {
        const path = environment.urlApi + '/literals/' + lang;
        return this.http.get(path);
    }
}

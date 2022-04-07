import { AuthService } from './../api/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpService {
    constructor(private authService: AuthService) {}

    getHeaderWithToken(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            XSToken: `${token}`,
        });
    }
}

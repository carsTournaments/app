import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponseI } from 'src/app/interfaces/login-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  url = `${environment.urlApi}/auth`;
  
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponseI> {
    return this.httpClient.post<LoginResponseI>(`${this.url}/login`, {
      email,
      password,
    });
  }


}

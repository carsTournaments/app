import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponseI } from 'src/app/interfaces/login-response.interface';
import { StorageService } from '../../ionic/storage.service';
import { User } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  url = `${environment.urlApi}/auth`;

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  login(email: string, password: string): Observable<LoginResponseI> {
    return this.httpClient.post<LoginResponseI>(`${this.url}/login`, {
      email,
      password,
    });
  }

  logout() {
    this.storageService.remove('token');
    this.storageService.remove('user');
  }

  setToken(token: string) {
    this.storageService.set('token', token);
  }

  getToken(): Promise<string> {
    return this.storageService.get<string>('token');
  }

  setUser(user: User) {
    this.storageService.set('user', user);
  }

  getUser(): Promise<User> {
    return this.storageService.get<User>('user');
  }

  async isAuthenticated(): Promise<boolean> {
    return this.getToken().then((token) => token !== null);
  }

}

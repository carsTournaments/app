import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpService {
  getHeaderWithToken(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      XSToken: `${token}`,
    });
  }
}

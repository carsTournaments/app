import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalHttpInterceptor implements HttpInterceptor {
  constructor(public router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // backend error
          if (error.status === 999) {
            this.clearStorageData();
          } else {
            errorMessage = error.error.message;
          }
        }
        return throwError(errorMessage);
      })
    );
  }

  checkError(error: any): any {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('Error Event', error);
      } else {
        if (error.status === 999) {
          this.clearStorageData();
        } else {
          return throwError(error.error.message);
        }
      }
    }
  }

  clearStorageData() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
/* eslint-enable no-console */

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
import { TokenService } from '@core/auth/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    XSToken: `${token}`,
                },
            });
        }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    return throwError(error);
                } else {
                    if (error.status === 999) {
                        this.tokenService.clear();
                    }
                    return throwError(error);
                }
            })
        );
    }
}

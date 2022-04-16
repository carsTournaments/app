import {Injectable} from '@angular/core';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import {AuthService, SpinnerHandlerService} from 'src/app/services';

@Injectable({
    providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private spinnerHandler: SpinnerHandlerService
    ) {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    XSToken: `${token}`,
                },
            });
        }
        this.spinnerHandler.handleRequest('plus');

        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 999) {
                    this.authService.logout();
                }
                const error = err.error.message || err.statusText;
                return throwError(error);
            }),
            finalize(this.finalize.bind(this))
        );
    }
    finalize = (): void => this.spinnerHandler.handleRequest();
}

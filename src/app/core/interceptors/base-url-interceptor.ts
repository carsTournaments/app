import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const BASE_URL = new InjectionToken<string>('BASE_URL');
export const IMAGES_URL = new InjectionToken<string>('IMAGES_URL');

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private hasScheme = (url: string) =>
    this.baseUrl && new RegExp('^http(s)?://', 'i').test(url);

  constructor(@Optional() @Inject(BASE_URL) private baseUrl?: string) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request);
    // request.clone({ url: `${this.baseUrl}/${request.url}` })
  }
}

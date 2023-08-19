import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.has('X-Skip-Interceptor')) {
      return next.handle(request); // Pasar la solicitud sin modificar
    }

    const authToken = localStorage.getItem('token');
    const authRequest = request.clone({
      setHeaders: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Continuar con la solicitud modificada
    return next.handle(authRequest);
  }
}
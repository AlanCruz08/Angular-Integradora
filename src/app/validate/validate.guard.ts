import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class validateGuard implements CanActivate {

  constructor(private apiService: LoginService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const isTokenValid = await this.apiService.validacion(token);

        if (isTokenValid) {
          const userFromToken = await this.apiService.getUserFromToken(token);
          const authenticatedUser = await this.apiService.getAuthenticatedUser();

          if (userFromToken?.email === authenticatedUser?.email) {
            return true; // Usuario autenticado y propietario del token, se permite el acceso al dashboard
          } else {
            localStorage.removeItem('token');
            this.router.navigate(['/inicio']);
            return false; // Intento de acceso a la cuenta de otro usuario, redirigir al inicio
          }
        } else {
          localStorage.removeItem('token');
          this.router.navigate(['/inicio']);
          return false; // Usuario no autenticado, se redirige al login
        }
      } catch (error) {
        localStorage.removeItem('token');
        // Manejar el error según tus necesidades
        this.router.navigate(['/inicio']);
        return false; // Error al verificar el token, se redirige al login por precaución
      }
    } else {
      this.router.navigate(['/inicio']);
      return false; // Usuario no autenticado, se redirige al login
    }
  }
}

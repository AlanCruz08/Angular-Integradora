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
          // El token es válido
          return true;
        } else {
          // El token no es válido
          localStorage.removeItem('token');
          this.router.navigate(['/inicio']);
          return false;
        }
      } catch (error) {
        // Hubo un error al verificar el token
        localStorage.removeItem('token');
        // console.error('Error al verificar el token:', error);
        this.router.navigate(['/inicio']);
        return false;
      }
    } else {
      // El usuario no está autenticado
      this.router.navigate(['/inicio']);
      return false;
    }
  }
}
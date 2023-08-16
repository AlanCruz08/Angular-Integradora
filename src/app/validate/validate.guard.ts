import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class validateGuard implements CanActivate {

  constructor(private apiService: LoginService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const isTokenValid = await this.validarToken();

    if (isTokenValid) {
      // El token es válido
      return true;
    } else {
      // El token no es válido
      this.router.navigate(['/inicio']);
      return false;
    }
  }

  async validarToken(): Promise<Boolean> {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const isTokenValid = await this.apiService.validacion(token);
        return isTokenValid;  // Asumiendo que apiService.validacion devuelve boolean
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
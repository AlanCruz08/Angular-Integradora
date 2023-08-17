import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class validateGuard implements CanActivate {

  constructor(private apiService: LoginService, private router: Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const token = localStorage.getItem('token');

    if (!token) {
      return this.router.createUrlTree(['/inicio']); // Usuario no autenticado
    }

    try {
      const isTokenValid = await this.apiService.validacion(token);
      
      if (isTokenValid) {
        return true; // Token válido, acceso permitido
      } else {
        localStorage.removeItem('token');
        return this.router.createUrlTree(['/inicio']); // Token no válido
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
      localStorage.removeItem('token');
      return this.router.createUrlTree(['/inicio']); // Error al verificar el token
    }
  }
}
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
          return true;
        } else {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
          return false;
        }
      } catch (error) {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
        return false;
      }
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

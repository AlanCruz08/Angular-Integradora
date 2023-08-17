// query-guard.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerifyGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const queryParams = next.queryParams;
    const registerData = JSON.parse(queryParams['registerData'] || '{}'); // Parse JSON or use empty object

    if (
      registerData.hasOwnProperty('name') &&
      registerData.hasOwnProperty('email') &&
      registerData.hasOwnProperty('password')
    ) {
      return true;
    } else {
      // Redirect to another route if any of the fields is missing
      this.router.navigate(['/register']); // Replace with the desired redirect route
      return false;
    }
  }
}

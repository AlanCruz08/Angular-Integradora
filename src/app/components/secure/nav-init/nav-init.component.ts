import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-init',
  templateUrl: './nav-init.component.html',
  styleUrls: ['./nav-init.component.css']
})
export class NavInitComponent {

  constructor(private router: Router) {}


  goToLogin() {
    this.router.navigate(['/login']);
}

goToRegister() {
    this.router.navigate(['/register']);
}


}

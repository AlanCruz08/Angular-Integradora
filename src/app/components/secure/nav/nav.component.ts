import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  token = localStorage.getItem('token');
  error!: string | null;

  constructor(private logout: LoginService, private router: Router) { }
  
  cerrarSesion() {
    if (this.token !== null) {
      this.logout.logout({ token: this.token }).subscribe(
        (response: any) => {
          console.log(response);
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        },
        error => {
          console.log(this.error = error.error.msg);
          this.router.navigate(['/']);
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }

}

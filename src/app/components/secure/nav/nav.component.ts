import { Component } from '@angular/core';
import { LoginService as Deslogueo } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  token = localStorage.getItem('token');
  error!: string | null;

  constructor(private deslogueo: Deslogueo, private router: Router) { }
  
  cerrarSesion() {
    if (this.token !== null) {
      this.deslogueo.Deslogueo({ token: this.token }).subscribe(
        (response: any) => {
          console.log(response);
          localStorage.removeItem('token');
          this.router.navigate(['/inicio']);
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

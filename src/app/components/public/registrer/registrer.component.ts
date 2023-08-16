import { Component } from '@angular/core';
import { Register } from 'src/app/interface/login';
import { LoginService as registerService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent {

   register: Register = { name: '', email: '', password: '' };
  error!: string | null;

  constructor(private registerService: registerService, private router: Router) {
    this.error = null;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirigir al usuario a la página principal
      this.router.navigate(['/register']);
    }
  }

  EnvioDatos() {
    if (this.register.email && this.register.password && this.register.name && this.register.password.length >= 8) {
      console.log("enviar datos");
      this.registerService.register(this.register).subscribe(
        (response: any) => {
          this.error = null;
          const token = response.access_token;
          localStorage.setItem('token', token);
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.error = error && error.error && error.error.msg ? error.error.msg : 'Error desconocido.';
          
          setTimeout(() => {
            this.error = null; // Restablecer el valor a null para regresar al estado default
          }, 2000);
        }
      );
    } else {
      this.error = 'Por favor, verifica los campos.';
      setTimeout(() => {
        this.error = null; // Restablecer el valor a null para regresar al estado default
      }, 2000);
    }
  }

  goBack(){
    window.history.back();
  }

}

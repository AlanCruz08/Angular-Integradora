import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Register } from 'src/app/interface/login';
import { LoginService as RegisterService } from 'src/app/services/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})

export class VerifyComponent implements OnInit { // Implementar OnInit

  error: string | null = null;
  registerData: Register | null = null;
  verificationCode: number = 0;

  verifyForm: FormGroup; // Agregar la definición del FormGroup

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder // Inyectar el FormBuilder en el constructor
  ) {
    this.error = null;
    this.verifyForm = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.maxLength(4)]] // Usar Validators
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['registerData']) {
        this.registerData = JSON.parse(params['registerData']);
      }
    });
  }

  VerificarCodigo() {
    console.log(this.registerData);
    if (this.registerData && this.verifyForm.valid) { // Verificar si el formulario es válido
      const codigoControl = this.verifyForm.get('codigo');
      if (codigoControl) {
        this.verificationCode = codigoControl.value;
        this.registerData.codigo = this.verificationCode;
        console.log(this.registerData);
        this.registerService.verify(this.registerData).subscribe(
          (response: any) => {
            this.error = null;
            const token = response.access_token;
            localStorage.setItem('token', token);
            this.router.navigate(['/dashboard']);
          },
          error => {
            console.error('Error en la solicitud:', error);
            this.error = error && error.error && error.error.msg ? error.error.msg : 'Error desconocido.';
            setTimeout(() => {
              this.error = null;
            }, 2000);
          }
        );
      } else {
        this.error = 'Por favor, verifica los campos.';
        setTimeout(() => {
          this.error = null;
        }, 2000);
      }
      } else {
        this.error = 'Por favor, verifica los campos.';
        setTimeout(() => {
          this.error = null;
        }, 2000);
      }
    }

    goBack() {
      window.history.back();
    }
  }

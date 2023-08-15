import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecureService } from 'src/app/services/secure.service';
import { SensoresAll } from 'src/app/interface/sensores';

@Component({
  selector: 'app-pir',
  templateUrl: './pir.component.html',
  styleUrls: ['./pir.component.css']
})
export class PirComponent implements OnInit {
  valoresPir: SensoresAll [] = [];

  constructor(private router: Router, private secureService: SecureService) { }

  ngOnInit(): void {
    this.obtenerValoresPir();
  }

  obtenerValoresPir(): void {
    this.secureService.getPIRAll().subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
  
        if (Array.isArray(response.data)) {
          this.valoresPir = response.data;
          console.log('Valores de pir asignados:', this.valoresPir);
        } else if (response.data && typeof response.data === 'object') {
          // Si es un objeto individual, crea un array con ese objeto
          this.valoresPir = [response.data];
          console.log('Valor de pir individual asignado:', this.valoresPir);
        } else {
          console.error('Los datos de pir no son válidos:', response.data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los valores de pir:', error);
      }
    );
  }

}

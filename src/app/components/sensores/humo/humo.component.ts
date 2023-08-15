import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecureService } from 'src/app/services/secure.service';
import { SensoresAll } from 'src/app/interface/sensores';


@Component({
  selector: 'app-humo',
  templateUrl: './humo.component.html',
  styleUrls: ['./humo.component.css']
})
export class HumoComponent implements OnInit {
  valoresHumo: SensoresAll [] = [];

  constructor(private router: Router, private secureService: SecureService) { }

  ngOnInit(): void {
    this.obtenerValoresHumo();
  }

  obtenerValoresHumo(): void {
    this.secureService.getHumoAll().subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
  
        if (Array.isArray(response.data)) {
          this.valoresHumo = response.data;
          console.log('Valores de humo asignados:', this.valoresHumo);
        } else if (response.data && typeof response.data === 'object') {
          // Si es un objeto individual, crea un array con ese objeto
          this.valoresHumo = [response.data];
          console.log('Valor de humo individual asignado:', this.valoresHumo);
        } else {
          console.error('Los datos de humo no son válidos:', response.data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los valores de humo:', error);
      }
    );
  }


}

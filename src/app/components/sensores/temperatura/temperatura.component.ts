import { Component, OnInit } from '@angular/core';
import { SecureService } from 'src/app/services/secure.service';
import { Sensor } from 'src/app/interface/sensores';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SensoresAll } from 'src/app/interface/sensores';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent implements OnInit {
  valoresTemperatura: SensoresAll [] = [];
  temperaturas: Sensor[] = [];

  constructor(
    private secureService: SecureService,
    private http: HttpClient,
    private router: Router,
    ) { }

    ngOnInit(): void {
      this.obtenerValoresTemperatura();
    }
  
    obtenerValoresTemperatura(): void {
      this.secureService.getTemperaturaAll().subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
    
          if (Array.isArray(response.data)) {
            this.valoresTemperatura = response.data;
            console.log('Valores de humedad asignados:', this.valoresTemperatura);
          } else if (response.data && typeof response.data === 'object') {
            // Si es un objeto individual, crea un array con ese objeto
            this.valoresTemperatura = [response.data];
            console.log('Valor de humedad individual asignado:', this.valoresTemperatura);
          } else {
            console.error('Los datos de humedad no son válidos:', response.data);
          }
        },
        (error: any) => {
          console.error('Error al obtener los valores de humedad:', error);
        }
      );
    }
  
  
  

}

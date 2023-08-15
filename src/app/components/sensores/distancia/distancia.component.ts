import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecureService } from 'src/app/services/secure.service';
import { SensoresAll } from 'src/app/interface/sensores';

@Component({
  selector: 'app-distancia',
  templateUrl: './distancia.component.html',
  styleUrls: ['./distancia.component.css']
})
export class DistanciaComponent implements OnInit {
  valoresDistancia: SensoresAll [] = [];

  constructor(private router: Router, private secureService: SecureService) { }

  ngOnInit(): void {
    this.obtenerValoresDistancia();
  }

  obtenerValoresDistancia(): void {
    this.secureService.getDistanciaAll().subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
  
        if (Array.isArray(response.data)) {
          this.valoresDistancia = response.data;
          console.log('Valores de humedad asignados:', this.valoresDistancia);
        } else if (response.data && typeof response.data === 'object') {
          // Si es un objeto individual, crea un array con ese objeto
          this.valoresDistancia = [response.data];
          console.log('Valor de humedad individual asignado:', this.valoresDistancia);
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

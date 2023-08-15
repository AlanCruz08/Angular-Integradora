import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecureService } from 'src/app/services/secure.service';
import { Humedad } from 'src/app/interface/sensores';

@Component({
  selector: 'app-humedad', // Asegúrate de que el selector sea el correcto
  templateUrl: './humedad.component.html',
  styleUrls: ['./humedad.component.css']
})
export class HumedadComponent implements OnInit {
  valoresHumedad: Humedad [] = [];

  constructor(private router: Router, private secureService: SecureService) { }

  ngOnInit(): void {
    this.obtenerValoresHumedad();
  }

  obtenerValoresHumedad(): void {
    this.secureService.getHumedadAll().subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
  
        if (Array.isArray(response.data)) {
          this.valoresHumedad = response.data;
          console.log('Valores de humedad asignados:', this.valoresHumedad);
        } else if (response.data && typeof response.data === 'object') {
          // Si es un objeto individual, crea un array con ese objeto
          this.valoresHumedad = [response.data];
          console.log('Valor de humedad individual asignado:', this.valoresHumedad);
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

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
  valoresDistancia: SensoresAll[] = [];
  valoresFiltrados: SensoresAll[] = [];      // Arreglo para almacenar los valores filtrados
  fechaBusqueda: boolean = false; // Indica si hay una búsqueda activa o no
  fechaInicial: string = ''; // Fecha inicial del rango de búsqueda
  fechaFinal: string = ''; // Fecha final del rango de búsqueda


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
  buscarValores(): void {
    const filtro = {
      sensor_id: 2, // Cambia este valor al ID del sensor que desees
      fecha_inicial: this.fechaInicial,
      fecha_final: this.fechaFinal
    };

    console.log('Filtro enviado al servidor:', filtro);

    this.secureService.getRegistrosPorRangoDeFechas(filtro).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);

        if (Array.isArray(response.data)) {
          this.valoresFiltrados = response.data; // Asigna los valores filtrados a la variable
          console.log('Valores filtrados asignados:', this.valoresFiltrados);
          this.fechaBusqueda = true; // Marca que hay una búsqueda activa
        } else {
          console.error('Los datos filtrados no son válidos:', response.data);
          this.fechaBusqueda = false; // Marca que no hay una búsqueda activa
        }
      },
      (error: any) => {
        console.error('Error al obtener los valores filtrados:', error);
        this.fechaBusqueda = false; // Marca que no hay una búsqueda activa
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecureService } from 'src/app/services/secure.service';
import { SensoresAll } from 'src/app/interface/sensores';

@Component({
  selector: 'app-alcohol',
  templateUrl: './alcohol.component.html',
  styleUrls: ['./alcohol.component.css']
})
export class AlcoholComponent implements OnInit {
  valoresAlcohol: SensoresAll[] = [];        // Arreglo para almacenar los valores originales
  valoresFiltrados: SensoresAll[] = [];      // Arreglo para almacenar los valores filtrados
  fechaBusqueda: boolean = false; // Indica si hay una búsqueda activa o no
  fechaInicial: string = ''; // Fecha inicial del rango de búsqueda
  fechaFinal: string = ''; // Fecha final del rango de búsqueda

  constructor(private router: Router, private secureService: SecureService) { }

  ngOnInit(): void {
    this.obtenerValoresAlcohol();            // Al inicializar el componente, se obtienen los valores
  }

  obtenerValoresAlcohol(): void {
    this.secureService.getAlcoholAll().subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);

        if (Array.isArray(response.data)) {
          this.valoresAlcohol = response.data;   // Almacenar valores de alcohol en el arreglo
          console.log('Valores de alcohol asignados:', this.valoresAlcohol);
        } else if (response.data && typeof response.data === 'object') {
          this.valoresAlcohol = [response.data];  // Convertir objeto individual en un arreglo
          console.log('Valor de alcohol individual asignado:', this.valoresAlcohol);
        } else {
          console.error('Los datos de alcohol no son válidos:', response.data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los valores de alcohol:', error);
      }
    );
  }

  buscarValores(): void {
    const filtro = {
      sensor_id: 6, // Cambia este valor al ID del sensor que desees
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

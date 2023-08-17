import { Component, OnInit } from '@angular/core';
import { SecureService } from 'src/app/services/secure.service';
import { SensoresAll } from 'src/app/interface/sensores';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent implements OnInit {
  valoresTemperatura: SensoresAll[] = [];
  valoresFiltrados: SensoresAll[] = [];
  fechaBusqueda: boolean = false; // Cambia esto para controlar si hay una búsqueda activa
  fechaInicial: string = '';
  fechaFinal: string = '';

  constructor(private secureService: SecureService) { }

  ngOnInit(): void {
    this.obtenerValoresTemperatura();
  }

  obtenerValoresTemperatura(): void {
    this.secureService.getTemperaturaAll().subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);

        if (Array.isArray(response.data)) {
          this.valoresTemperatura = response.data;
          console.log('Valores de temperatura asignados:', this.valoresTemperatura);
        } else if (response.data && typeof response.data === 'object') {
          this.valoresTemperatura = [response.data];
          console.log('Valor de temperatura individual asignado:', this.valoresTemperatura);
        } else {
          console.error('Los datos de temperatura no son válidos:', response.data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los valores de temperatura:', error);
      }
    );
  }

  buscarValores(): void {
    const filtro = {
      sensor_id: 1, // Cambia este valor al ID del sensor que desees
      fecha_inicial: this.fechaInicial,
      fecha_final: this.fechaFinal
    };

    console.log('Filtro enviado al servidor:', filtro);

    this.secureService.getRegistrosPorRangoDeFechas(filtro).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);

        if (Array.isArray(response.data)) {
          this.valoresFiltrados = response.data;
          console.log('Valores filtrados asignados:', this.valoresFiltrados);
          this.fechaBusqueda = true; // Marcar que hay una búsqueda activa
        } else {
          console.error('Los datos filtrados no son válidos:', response.data);
          this.fechaBusqueda = false; // Marcar que no hay una búsqueda activa
        }
      },
      (error: any) => {
        console.error('Error al obtener los valores filtrados:', error);
        this.fechaBusqueda = false; // Marcar que no hay una búsqueda activa
      }
    );
  }
}

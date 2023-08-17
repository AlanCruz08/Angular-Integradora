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
  valoresHumo: SensoresAll[] = [];
  valoresFiltrados: SensoresAll[] = [];      // Arreglo para almacenar los valores filtrados
  fechaBusqueda: string = '';

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
  buscarPorFecha(): void {
    if (this.fechaBusqueda) {
      console.log('Fecha de búsqueda:', this.fechaBusqueda);

      // Convertir la fecha de búsqueda al formato adecuado
      const fechaBusquedaFormatted = this.formatoFechaBusqueda(this.fechaBusqueda);

      // Filtrar los valores por la fecha de búsqueda
      this.valoresFiltrados = this.valoresHumo.filter((valor) => {
        console.log('Comparando fechas:', valor.fecha, fechaBusquedaFormatted);
        return this.sonFechasIguales(valor.fecha, fechaBusquedaFormatted);
      });

      console.log('Valores filtrados:', this.valoresFiltrados);
    } else {
      this.valoresFiltrados = [];   // Si no hay fecha de búsqueda, vaciar los valores filtrados
    }
  }

  // Función para convertir la fecha de búsqueda al formato adecuado
  formatoFechaBusqueda(fecha: string): string {
    const dateParts = fecha.split('-');
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    return `${day}/${month}/${year}`;
  }

  // Función para comparar si dos fechas son iguales (solo la parte de la fecha, sin hora)
  sonFechasIguales(fecha1: string, fecha2: string): boolean {
    return fecha1.split(' ')[0] === fecha2;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecureService } from 'src/app/services/secure.service';
import { SensoresAll } from 'src/app/interface/sensores';

@Component({
  selector: 'app-humedad', // Asegúrate de que el selector sea el correcto
  templateUrl: './humedad.component.html',
  styleUrls: ['./humedad.component.css']
})
export class HumedadComponent implements OnInit {
  valoresHumedad: SensoresAll[] = [];
  valoresFiltrados: SensoresAll[] = [];      // Arreglo para almacenar los valores filtrados
  fechaBusqueda: string = '';                // Variable para almacenar la fecha de búsqueda


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

  buscarPorFecha(): void {
    if (this.fechaBusqueda) {
      console.log('Fecha de búsqueda:', this.fechaBusqueda);

      // Convertir la fecha de búsqueda al formato adecuado
      const fechaBusquedaFormatted = this.formatoFechaBusqueda(this.fechaBusqueda);

      // Filtrar los valores por la fecha de búsqueda
      this.valoresFiltrados = this.valoresHumedad.filter((valor) => {
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

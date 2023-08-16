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
  valoresAlcohol: SensoresAll[] = [];
  valoresFiltrados: SensoresAll[] = [];
  fechaBusqueda: string = '';

  constructor(private router: Router, private secureService: SecureService) { }

  ngOnInit(): void {
    this.obtenerValoresAlcohol();
  }

  obtenerValoresAlcohol(): void {
    this.secureService.getAlcoholAll().subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);

        if (Array.isArray(response.data)) {
          this.valoresAlcohol = response.data;
          console.log('Valores de alcohol asignados:', this.valoresAlcohol);
        } else if (response.data && typeof response.data === 'object') {
          this.valoresAlcohol = [response.data];
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

  buscarPorFecha(): void {
    if (this.fechaBusqueda) {
      console.log('Fecha de búsqueda:', this.fechaBusqueda);
      
      const fechaBusquedaFormatted = this.formatoFechaBusqueda(this.fechaBusqueda);
      
      this.valoresFiltrados = this.valoresAlcohol.filter((valor) => {
        console.log('Comparando fechas:', valor.fecha, fechaBusquedaFormatted);
        return this.sonFechasIguales(valor.fecha, fechaBusquedaFormatted);
      });
      
      console.log('Valores filtrados:', this.valoresFiltrados);
    } else {
      this.valoresFiltrados = [];
    }
  }
  
  formatoFechaBusqueda(fecha: string): string {
    const dateParts = fecha.split('-');
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    return `${day}/${month}/${year}`;
  }
  

  sonFechasIguales(fecha1: string, fecha2: string): boolean {
    return fecha1.split(' ')[0] === fecha2;
  }
}

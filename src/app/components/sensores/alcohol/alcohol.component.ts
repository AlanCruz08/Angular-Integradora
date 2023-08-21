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

  currentPage: number = 1; // Página actual
  itemsPerPage: number = 20; // Cantidad de elementos por página
  totalPages: number = 0;

  constructor(private router: Router, private secureService: SecureService) { }
  changePage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }
  ngOnInit(): void {
    this.obtenerValoresAlcohol(); // Llama a la función para obtener todos los valores de alcohol
  }

  get valoresPaginados(): SensoresAll[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.fechaBusqueda ? this.valoresFiltrados.slice(startIndex, endIndex) : this.valoresAlcohol.slice(startIndex, endIndex);
  }

  obtenerValoresAlcohol(): void {
    this.secureService.getAlcoholAll().subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
        if (Array.isArray(response.data)) {
          this.valoresAlcohol = response.data; // Asigna los valores de alcohol recuperados
          console.log('Valores de alcohol asignados:', this.valoresAlcohol);
          this.totalPages = Math.ceil(this.valoresAlcohol.length / this.itemsPerPage);
          this.currentPage = 1;
        } else if (response.data && typeof response.data === 'object') {
          this.valoresAlcohol = [response.data]; // Crea un array con el valor de alcohol individual
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
          this.totalPages = Math.ceil(this.valoresFiltrados.length / this.itemsPerPage);
          this.currentPage = 1;
          this.fechaBusqueda = true;
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

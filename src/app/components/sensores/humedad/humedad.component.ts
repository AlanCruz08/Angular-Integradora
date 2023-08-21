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
    this.obtenerValoresHumedad(); // Llama a la función para obtener todos los valores de temperatura
  }

  get valoresPaginados(): SensoresAll[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.fechaBusqueda ? this.valoresFiltrados.slice(startIndex, endIndex) : this.valoresHumedad.slice(startIndex, endIndex);
  }

  obtenerValoresHumedad(): void {
    this.secureService.getHumedadAll().subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
        if (Array.isArray(response.data)) {
          this.valoresHumedad = response.data; // Asigna los valores de humedad recuperados
          console.log('Valores de humedad asignados:', this.valoresHumedad);
          this.totalPages = Math.ceil(this.valoresHumedad.length / this.itemsPerPage);
          this.currentPage = 1;
        } else if (response.data && typeof response.data === 'object') {
          this.valoresHumedad = [response.data]; // Crea un array con el valor de humedad individual
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

  buscarValores(): void {
    const filtro = {
      sensor_id: 3, // Cambia este valor al ID del sensor que desees
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

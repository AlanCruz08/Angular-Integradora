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
  valoresAlcohol: SensoresAll [] = [];

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
          // Si es un objeto individual, crea un array con ese objeto
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

  
  
  
}

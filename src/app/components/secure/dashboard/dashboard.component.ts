import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Temperatura } from 'src/app/interface/sensores'; // Importar la interfaz Temperatura
import { SecureService } from 'src/app/services/secure.service'; // Importar el servicio SecureService

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  temperaturas: Temperatura[] = []; // Arreglo para almacenar los datos de temperatura
  private intervalId: any; // Variable para almacenar el ID del intervalo

  constructor(private router: Router, private secureService: SecureService) { }

  ngOnInit(): void {
    this.obtenerTemperaturas(); // Llamar al método para obtener temperaturas al inicializar el componente
    this.iniciarIntervalo(); // Llamar al método para iniciar el intervalo al inicializar el componente
  }

  ngOnDestroy(): void {
    this.detenerIntervalo();
  }

  // Método para obtener los datos de temperatura desde el servicio
  obtenerTemperaturas(): void {
    this.secureService.getTemperaturas().subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.temperaturas = response.data; // Asignar el arreglo de temperaturas al arreglo local
          console.log(this.temperaturas);
        } else if (response.data && typeof response.data === 'object') {
          // Si es un objeto individual, crea un array con ese objeto
          this.temperaturas = [response.data];
          console.log(this.temperaturas);
        } else {
          console.error('Los datos de temperatura no son válidos:', response.data);
        }
      },
      (error: any) => {
        console.error('Error al obtener las temperaturas:', error);
      }
    );
  }

  // Método para redirigir a un componente específico en función del nombre recibido
  redirectToComponent(componentName: string) {
    switch (componentName) {
      case 'temperatura':
        this.router.navigate(['/temperatura']);
        break;
      case 'humedad':
        this.router.navigate(['/humedad']);
        break;
      case 'humo':
        this.router.navigate(['/humo']);
        break;
      case 'alcohol':
        this.router.navigate(['/alcohol']);
        break;
      case 'pir':
        this.router.navigate(['/pir']);
        break;
      case 'distancia':
        this.router.navigate(['/distancia']);
        break;
    }
  }

  iniciarIntervalo(): void {
    this.intervalId = setInterval(() => {
      this.obtenerTemperaturas();
    }, 30000); // Ejecutar cada 30 segundos (30000 milisegundos)
  }

  detenerIntervalo(): void {
    clearInterval(this.intervalId);
  }
}

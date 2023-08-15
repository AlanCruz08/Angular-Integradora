import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sensor } from 'src/app/interface/sensores'; // Importar la interfaz Temperatura
import { SecureService } from 'src/app/services/secure.service'; // Importar el servicio SecureService

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  temperatura: Sensor[] = []; // Arreglo para almacenar los datos de temperatura
  humedad: Sensor[] = []; // Arreglo para almacenar los datos de humedad
  distancia: Sensor[] = []; // Arreglo para almacenar los datos de distancia
  pir: Sensor[] = []; // Arreglo para almacenar los datos de pir
  alcohol: Sensor[] = []; // Arreglo para almacenar los datos de alcohol
  humo: Sensor[] = []; // Arreglo para almacenar los datos de humo

  
  private intervalId: any; // Variable para almacenar el ID del intervalo

  constructor(private router: Router, private secureService: SecureService) { }

  ngOnInit(): void {
    this.obtenerTemperatura(); // Llamar al método para obtener temperaturas al inicializar el componente
    this.obtenerHumedad();
    this.obtenerDistancia();
    this.obtenerPir();
    this.obtenerAlcohol();
    this.obtenerHumo();

    this.iniciarIntervalo(); // Llamar al método para iniciar el intervalo al inicializar el componente
  }

  ngOnDestroy(): void {
    this.detenerIntervalo();
  }

  // Método para obtener los datos de temperatura desde el servicio
  obtenerTemperatura(): void {
    this.secureService.getTemperatura().subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.temperatura = response.data; // Asignar el arreglo de temperaturas al arreglo local
          console.log(this.temperatura);
        } else if (response.data && typeof response.data === 'object') {
          // Si es un objeto individual, crea un array con ese objeto
          this.temperatura = [response.data];
          console.log(this.temperatura);
        } else {
          console.error('Los datos de temperatura no son válidos:', response.data);
        }
      },
      (error: any) => {
        console.error('Error al obtener las temperaturas:', error);
      }
    );
  }
  // Método para obtener los datos de humedad desde el servicio
  obtenerHumedad(): void {
    this.secureService.getHumedad().subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.humedad = response.data; // Asignar el arreglo de temperaturas al arreglo local
          console.log(this.humedad);
        } else if (response.data && typeof response.data === 'object') {
          // Si es un objeto individual, crea un array con ese objeto
          this.humedad = [response.data];
          console.log(this.humedad);
        } else {
          console.error('Los datos de temperatura no son válidos:', response.data);
        }
      },
      (error: any) => {
        console.error('Error al obtener las temperaturas:', error);
      }
    );
  }
  // Método para obtener los datos de distancia desde el servicio
  obtenerDistancia(): void {
    this.secureService.getDistancia().subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.distancia = response.data; // Asignar el arreglo de temperaturas al arreglo local
          console.log(this.distancia);
        } else if (response.data && typeof response.data === 'object') {
          // Si es un objeto individual, crea un array con ese objeto
          this.distancia = [response.data];
          console.log(this.distancia);
        } else {
          console.error('Los datos de temperatura no son válidos:', response.data);
        }
      },
      (error: any) => {
        console.error('Error al obtener las temperaturas:', error);
      }
    );
  }
  // Método para obtener los datos de pir desde el servicio
  obtenerPir(): void {
    this.secureService.getPir().subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.pir = response.data; // Asignar el arreglo de temperaturas al arreglo local
          console.log(this.pir);
        } else if (response.data && typeof response.data === 'object') {
          // Si es un objeto individual, crea un array con ese objeto
          this.pir = [response.data];
          console.log(this.pir);
        } else {
          console.error('Los datos de temperatura no son válidos:', response.data);
        }
      },
      (error: any) => {
        console.error('Error al obtener las temperaturas:', error);
      }
    );
  }
  // Método para obtener los datos de alcohol desde el servicio
  obtenerAlcohol(): void {
    this.secureService.getAlcohol().subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.alcohol = response.data; // Asignar el arreglo de temperaturas al arreglo local
          console.log(this.alcohol);
        } else if (response.data && typeof response.data === 'object') {
          // Si es un objeto individual, crea un array con ese objeto
          this.alcohol = [response.data];
          console.log(this.alcohol);
        } else {
          console.error('Los datos de temperatura no son válidos:', response.data);
        }
      },
      (error: any) => {
        console.error('Error al obtener las temperaturas:', error);
      }
    );
  }
  // Método para obtener los datos de humo desde el servicio
  obtenerHumo(): void {
    this.secureService.getHumo().subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          this.humo = response.data; // Asignar el arreglo de temperaturas al arreglo local
          console.log(this.humo);
        } else if (response.data && typeof response.data === 'object') {
          // Si es un objeto individual, crea un array con ese objeto
          this.humo = [response.data];
          console.log(this.humo);
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
      this.obtenerTemperatura();
    }, 30000); // Ejecutar cada 30 segundos (30000 milisegundos)
  }

  detenerIntervalo(): void {
    clearInterval(this.intervalId);
  }
}

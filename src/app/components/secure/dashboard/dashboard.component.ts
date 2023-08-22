import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Sensor, SensorInfo } from 'src/app/interface/sensores';
import { SecureService } from 'src/app/services/secure.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sensores: SensorInfo[] = [
    {
      nombre: 'Temperatura',
      imagen: '/assets/sensores/temperatura.svg',
      ruta: 'temperatura',
      datos: [],
      advertencia: 'Temperatura alta',
      umbral: 32,
      mostrarCuandoMayor: true
    },
    {
      nombre: 'Humedad',
      imagen: '/assets/sensores/humedad.svg',
      ruta: 'humedad',
      datos: [],
      advertencia: 'Humedad alta',
      umbral: 80,
      mostrarCuandoMayor: true

    },
    {
      nombre: 'Distancia',
      imagen: '/assets/sensores/distancia.svg',
      ruta: 'distancia',
      datos: [],
      advertencia: 'Cuidado muy cerca del sensor',
      umbral: 50,
      mostrarCuandoMayor: false

    },
    {
      nombre: 'Movimiento',
      imagen: '/assets/sensores/movimiento.svg',
      ruta: 'pir',
      datos: [],
      advertencia: 'Hay movimiento',
      umbral: 0,
      mostrarCuandoMayor: true,
    },
    {
      nombre: 'Alcohol',
      imagen: '/assets/sensores/alcohol.svg',
      ruta: 'alcohol',
      datos: [],
      advertencia: 'Niveles altos de alcohol',
      umbral: 400,
      mostrarCuandoMayor: true

    },
    {
      nombre: 'Humo',
      imagen: '/assets/sensores/humo.svg',
      ruta: 'humo',
      datos: [],
      advertencia: 'Los niveles de humo son altos',
      umbral: 20,
      mostrarCuandoMayor: true

    },
    // Agregar más sensores aquí
  ];

  private intervalId: any;

  constructor(private router: Router, private secureService: SecureService) { }

  ngOnInit(): void {
    this.inicializarDatosSensores();
    this.inicializarIntervalo();
  }

  ngOnDestroy(): void {
    this.detenerIntervalo();
  }

  inicializarDatosSensores(): void {
    for (const infoSensor of this.sensores) {
      this.obtenerDatosSensor(infoSensor);
    }
  }

  obtenerDatosSensor(infoSensor: SensorInfo): void {
    const funcionServicio = this.obtenerFuncionServicio(infoSensor.nombre.toLowerCase());
    if (funcionServicio) {
      funcionServicio.subscribe(
        (respuesta: any) => {
          // Procesar la respuesta y asignar datos a infoSensor.datos
          if (Array.isArray(respuesta.data)) {
            infoSensor.datos = respuesta.data;
          } else if (respuesta.data && typeof respuesta.data === 'object') {
            infoSensor.datos = [respuesta.data];
          } else {
            console.error('Los datos del sensor no son válidos:', respuesta.data);
          }
        },
        (error: any) => {
          console.error('Error al obtener los datos del sensor:', error);
        }
      );
    }
  }


  obtenerFuncionServicio(nombreSensor: string): any {
    switch (nombreSensor) {
      case 'temperatura':
        return this.secureService.getTemperatura();
      case 'humedad':
        return this.secureService.getHumedad();
      case 'distancia':
        return this.secureService.getDistancia();
      case 'movimiento':
        return this.secureService.getPir();
      case 'alcohol':
        return this.secureService.getAlcohol();
      case 'humo':
        return this.secureService.getHumo();
      // Agregar más casos para otros sensores
      default:
        return null;
    }
  }

  inicializarIntervalo(): void {
    this.intervalId = setInterval(() => {
      this.inicializarDatosSensores();
    }, 20000);
  }

  detenerIntervalo(): void {
    clearInterval(this.intervalId);
  }

  redirigirAComponente(nombreComponente: string) {
    this.router.navigate([`/${nombreComponente}`]);
  }

  obtenerValor(datos: Sensor[]): string | number {
    return datos.length > 0 ? datos[0].valor : 'No disponible';
  }

  obtenerUnidades(datos: Sensor[]): string {
    return datos.length > 0 ? datos[0].unidades : '';
  }

  debeMostrarAdvertencia(datos: Sensor[], umbral: number, mostrarCuandoMayor: boolean): boolean {
    if (datos.length > 0) {
      if (mostrarCuandoMayor) {
        return datos[0].valor > umbral;
      } else {
        return datos[0].valor < umbral;
      }
    }
    return false;
  }
  
}



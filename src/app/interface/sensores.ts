export interface Sensor {
    id: number;
    valor: number;
    unidades: string;
    
  }


export interface SensoresAll {
  id: number;
  valor: number | string;
  unidades: string;
  fecha: Date;
  hora: string;
}

export interface SensorInfo {
  nombre: string;
  imagen: string;
  ruta: string;
  datos: Sensor[];
  advertencia: string;
  umbral: number;
  mostrarCuandoMayor: boolean;
}
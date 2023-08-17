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

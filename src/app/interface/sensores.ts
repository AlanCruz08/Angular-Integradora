export interface Sensor {
    id: number;
    valor: number;
    unidades: string;
  }
export interface SensoresAll { 
    valor: number|string;  
    fecha: string; 
}
export interface Humo {}
export interface Alcohol {}
export interface Pir {}
export interface Distancia {}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'env';
import { Observable } from 'rxjs';
import { Sensor, SensoresAll } from 'src/app/interface/sensores';
@Injectable({
  providedIn: 'root'
})
export class SecureService {
  //Ultimo dato
  private apiUrlTemp = environment.apiTemp;
  private apiUrlHum = environment.apiHumedad;
  private apiUrlDist = environment.apiDist;
  private apiUrlPir = environment.apiPir;
  private apiUrlAlco = environment.apiAlco;
  private apiUrlHumo = environment.apiHumo;

  //All
  private apiUrlHumeAll = environment.apiHumeAll;
  private apiUrlTempAll = environment.apiTempAll;
  private apiUrlDistAll = environment.apiDistAll;
  private apiUrlPirAll = environment.apiPirAll;
  private apiUrlAlcoAll = environment.apiAlcoAll;
  private apiUrlHumoAll = environment.apiHumoAll;


  constructor(private http: HttpClient) { }
//Ultimo dato
  getTemperatura(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.apiUrlTemp}/`);
  }
  getHumedad(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.apiUrlHum}/`);
  }
  getDistancia(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.apiUrlDist}/`);
  }
  getPir(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.apiUrlPir}/`);
  }
  getAlcohol(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.apiUrlAlco}/`);
  }
  getHumo(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.apiUrlHumo}/`);
  }

   //All
  getHumedadAll(): Observable<SensoresAll[]> {
    return this.http.get<SensoresAll[]>(`${this.apiUrlHumeAll}/`);
  }
  getTemperaturaAll(): Observable<SensoresAll[]> {
    return this.http.get<SensoresAll[]>(`${this.apiUrlTempAll}/`);
  }
  getDistanciaAll(): Observable<SensoresAll[]> {
    return this.http.get<SensoresAll[]>(`${this.apiUrlDistAll}/`);
  }
  getPIRAll(): Observable<SensoresAll[]> {
    return this.http.get<SensoresAll[]>(`${this.apiUrlPirAll}/`);
  }
  getAlcoholAll(): Observable<SensoresAll[]> {
    return this.http.get<SensoresAll[]>(`${this.apiUrlAlcoAll}/`);
  }
  getHumoAll(): Observable<SensoresAll[]> {
    return this.http.get<SensoresAll[]>(`${this.apiUrlHumoAll}/`);
  }
}

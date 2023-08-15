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

  //All
  private apiUrlHumeAll = environment.apiHumeAll;
  private apiUrlTempAll = environment.apiTempAll;


  constructor(private http: HttpClient) { }
//Ultimo dato
  getTemperatura(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.apiUrlTemp}/`);
  }

  getHumedad(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.apiUrlHum}/`);
  }

   //All
  getHumedadAll(): Observable<SensoresAll[]> {
    return this.http.get<SensoresAll[]>(`${this.apiUrlHumeAll}/`);
  }

  getTemperaturaAll(): Observable<SensoresAll[]> {
    return this.http.get<SensoresAll[]>(`${this.apiUrlTempAll}/`);
  }
}

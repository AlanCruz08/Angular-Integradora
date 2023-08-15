import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'env';
import { Observable } from 'rxjs';
import { Humedad, Temperatura } from 'src/app/interface/sensores';
@Injectable({
  providedIn: 'root'
})
export class SecureService {

  private apiUrlTemp = environment.apiTemp;
  private apiUrlHumeAll = environment.apiHumeAll;

  constructor(private http: HttpClient) { }

    getTemperaturas(): Observable<Temperatura[]> {
      return this.http.get<Temperatura[]>(`${this.apiUrlTemp}/`);
  }

 

  getHumedadAll(): Observable<Humedad[]> {
    return this.http.get<Humedad[]>(`${this.apiUrlHumeAll}/`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Importa Observable
import { User } from 'src/app/interface/login';
import { environment } from 'env';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUser = environment.apiUser;

  constructor(private http: HttpClient) { }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUser}/`); 
  }
}

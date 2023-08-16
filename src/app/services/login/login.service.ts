import { Injectable } from '@angular/core';
import { Observable,throwError,catchError } from 'rxjs';
import { User } from 'src/app/interface/login';
import { environment } from 'env';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Login, Register, Deslogueo } from 'src/app/interface/login';


interface ApiResponse{
  data:boolean;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  headers: HttpHeaders;
  private apiUser = environment.apiUser;

  constructor(private http: HttpClient) 
  {
    this.headers = new HttpHeaders({ "Accept": "application/json", "Ahutorization": "Bearer " });
  }

  async validacion(token:string): Promise<Boolean> {
    try{
      const response = await this.http.get<ApiResponse>(`${this.apiUser}/validate`).toPromise();
      return response?.data === true;
    }catch (error) {
      // console.error('Error al verificar el token:', error);
      return false;
    }
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUser}/`); 
  }

  Deslogueo(credenciales: Deslogueo): Observable<any>
  {
    const token =localStorage.getItem('token');

    if(token)
    {
      const headers = new HttpHeaders({"Accept": "application/json", "Authorization": `Bearer ${token}` });
      return this.http.post(`${this.apiUser}/logout`, credenciales, { headers: headers }).pipe(
        catchError((error) => {
          // Manejar el error aquí según tus necesidades
          return throwError(error);
        })
      );
    } else {
      window.location.href = environment.webUrl + '/';
      console.log('Token not found');
      return throwError('Token not found');
    }
    
  }

  login(credenciales: Login)
  {
    const headers = new HttpHeaders().set('X-Skip-Interceptor', 'true');
    return this.http.post(`${this.apiUser}/login`, credenciales, { headers: headers });
  }

  register(credenciales: Register)
  {
    const headers = new HttpHeaders().set('X-Skip-Interceptor', 'true');
    return this.http.post(`${this.apiUser}/register`, credenciales, { headers: headers });
    
  }

  setAuthToken(token: string)
  {
    localStorage.setItem('authToken', token);
  }

  getAuthToken()
  {
    return localStorage.getItem('authToken');
  }

}


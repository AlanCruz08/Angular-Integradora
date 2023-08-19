import { Injectable } from '@angular/core';
import { Observable,throwError,catchError } from 'rxjs';
import { User, UserC } from 'src/app/interface/login';
import { environment } from 'env';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Login, Register, Logout } from 'src/app/interface/login';

interface ApiResponse{
  data:boolean;
}
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiUser = environment.apiUser;

  constructor(private http: HttpClient) {}

  async validacion(token:string): Promise<Boolean> {
    try{
      const response = await this.http.get<ApiResponse>(`${this.apiUser}/validate`).toPromise();
      return response?.data === true;
    }catch (error) {
      return false;
    }
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUser}/`); 
  }

  logout(credentials: Logout): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      return this.http.post(`${this.apiUser}/logout`, credentials).pipe(
        catchError((error) => {
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

  verify(credenciales: Register)
  {
    const headers = new HttpHeaders().set('X-Skip-Interceptor', 'true');
    return this.http.post(`${this.apiUser}/verificar`, credenciales, { headers: headers });
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
import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }


  login() {
    // Rediriger l'utilisateur vers la page de connexion
    window.location.href = `https://cgpgabon24.alwaysdata.net/auth`;
  }

  logout() {
    localStorage.removeItem('token');
  }

  getAuthUser(id: any): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/auth/user/'+id);
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  getToken() {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }
}

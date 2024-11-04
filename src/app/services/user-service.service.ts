import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(
    private http: HttpClient
  ) { }

  getUsers(id: any):Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/users/programme/'+id);
  }

  insertContributeur(data: any):Observable<any>{
    return this.http.post<any>('http://localhost:8000/api/insert/contributeur/', data);
  }

  getResponsableActivitebudgetannuel(id: any):Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/user/activitebudgetannuel/'+id);
  }

  getAffectation(id: any): Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/user/affectations/'+id);
  }

  getTaches(id: any): Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/user/taches/'+id);
  }
}

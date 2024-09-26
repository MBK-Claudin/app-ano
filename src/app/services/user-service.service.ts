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
}

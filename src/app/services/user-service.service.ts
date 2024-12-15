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
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/users/programme/'+id);
  }

  getUser():Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/users');
  }
  insertContributeur(data: any):Observable<any>{
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/insert/contributeur', data);
  }

  getResponsableActivitebudgetannuel(id: any):Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/user/activitebudgetannuel/'+id);
  }

  getAffectation(id: any): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/user/affectations/'+id);
  }

  getTaches(id: any): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/user/taches/'+id);
  }

  editContributeur(data: any):Observable<any>{
    return this.http.put<any>('https://cgpgabon24.alwaysdata.net/api/user/updateprogramme', data);
  }

}

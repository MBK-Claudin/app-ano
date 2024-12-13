import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  constructor(
    private http: HttpClient
  ) { }

  getActivite(): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/activite')
  }
  insertActivite(data: any): Observable<any> {
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/insert/activite', data);
  }

  getPhases(): Observable<any> {
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/activite/phases');
  }

  getSites() : Observable<any> {
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/activite/sites');
  }

  getJalonActivitebudgetannuel(id: any):Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/activite/activitebudgetannuel/'+id);
  }

}

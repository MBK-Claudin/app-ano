import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(
    private http: HttpClient
  ) { }

  getProgrammeSite(id: any):Observable<any>{
    return this.http.get('http://localhost:8000/api/programme/site/'+id);
  }

  insertSites(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/programme/insert/site', data);
  }
}

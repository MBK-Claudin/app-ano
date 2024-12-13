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
    return this.http.get('https://cgpgabon24.alwaysdata.net/api/programme/site/'+id);
  }

  insertSites(data: any): Observable<any> {
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/programme/insert/site', data);
  }

  insertNewSites(data: any): Observable<any> {
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/insert/site', data);
  }

  deleteSites(id: any): Observable<any> {
    return this.http.delete<any>('https://cgpgabon24.alwaysdata.net/api/delete/site/'+id);
  }


  getSite(): Observable<any> {
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/sites');
  }


}

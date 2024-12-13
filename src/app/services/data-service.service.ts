import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers():Observable<any> {
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/users');
  }

  getOrganisations():Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/organisations');
  }

  getJalon(): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/activite');
  }
}

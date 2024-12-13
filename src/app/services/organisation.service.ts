import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(
    private Http: HttpClient
  ) { }

  getOrganisations(): Observable<any>{
    return this.Http.get<any>('https://cgpgabon24.alwaysdata.net/api/organisations');
  }

  deleteOrganisation(id: any):Observable<any>{
    return this.Http.delete<any>('https://cgpgabon24.alwaysdata.net/api/delete/organisations/'+id);
  }

  insertOrganisation(data: any):Observable<any>{
    return this.Http.post<any>('https://cgpgabon24.alwaysdata.net/api/insert/organisations/', data);
  }
}

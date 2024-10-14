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
    return this.Http.get<any>('http://localhost:8000/api/organisations');
  }

  deleteOrganisation(id: any):Observable<any>{
    return this.Http.delete<any>('http://localhost:8000/api/delete/organisations/'+id);
  }

  insertOrganisation(data: any):Observable<any>{
    return this.Http.post<any>('http://localhost:8000/api/insert/organisations/', data);
  }
}

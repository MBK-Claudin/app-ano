import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImpactService {

  constructor(private http: HttpClient) {}

  getImpacts(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/impacts/' + id);  
  }

  getAcitviteProgramme(id: any): Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/budgetannuel/activite/programme/'+id);
  }

  insertImpact(data: any): Observable<any>{
    return this.http.post<any>('', data)
  }
}

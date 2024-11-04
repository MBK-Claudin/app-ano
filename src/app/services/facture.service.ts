import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(
    private http: HttpClient
  ) { }

  getFactures():Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/factures');
  }

  insertFacture(data: any):Observable<any>{
    return this.http.post<any>('http://localhost:8000/api/insert/factures', data);
  }

  getAno():Observable<any>{
    return this.http.get('http://localhost:8000/api/facture/ano');
  }

  getContract():Observable<any>{
    return this.http.get('http://localhost:8000/api/facture/contract');
  }

  getOneFActure(id: any):Observable<any>{
    return this.http.get('http://localhost:8000/api/select/facture/'+id);
  }

  getProgrammeFactures(id: any):Observable<any>{
    return this.http.get('http://localhost:8000/api/programme/facture/'+id);
  }

  getEtatFacture (id: any): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/facture/etatActuel/'+id);
  }

  traiterFacture(idFacture: any, idService: any, user_id: any): Observable<any>{
    return this.http.get<any>(`http://localhost:8000/api/facture/traitement/${idFacture}/${idService}/${user_id}`);
  }
}

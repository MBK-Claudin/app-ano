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
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/factures');
  }

  insertFacture(data: any):Observable<any>{
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/insert/factures', data);
  }

  getAno():Observable<any>{
    return this.http.get('https://cgpgabon24.alwaysdata.net/api/facture/ano');
  }

  getContract():Observable<any>{
    return this.http.get('https://cgpgabon24.alwaysdata.net/api/facture/contract');
  }

  getOneFActure(id: any):Observable<any>{
    return this.http.get('https://cgpgabon24.alwaysdata.net/api/select/facture/'+id);
  }

  getProgrammeFactures(id: any):Observable<any>{
    return this.http.get('https://cgpgabon24.alwaysdata.net/api/programme/facture/'+id);
  }

  getEtatFacture (id: any): Observable<any> {
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/facture/etatActuel/'+id);
  }

  traiterFacture(idFacture: any, idService: any, user_id: any): Observable<any>{
    return this.http.get<any>(`https://cgpgabon24.alwaysdata.net/api/facture/traitement/${idFacture}/${idService}/${user_id}`);
  }
}

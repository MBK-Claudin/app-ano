import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnoService {

  constructor(
    private http: HttpClient
  ) { }

  insertANO(data: any): Observable<any>{
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/insert/ano', data);
  }

  getANO(): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/ano');
  }

  getSelectANO(id: any):Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/select/edit/ano/'+id);
  }

  editAno(data: any): Observable<any>{
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/edit/ano', data);
  }

  deleteAno(id: any): Observable<any>{
    return this.http.delete<any>('https://cgpgabon24.alwaysdata.net/api/delete/ano/'+id);
  }

  getDetailAno(id: any): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/detail/ano/'+id);
  }

  getAnoProgramme(id: any): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/ano/programme/'+id);
  }

  etudeAno(id: any, data: any):Observable<any>{
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/ano/etude/'+id, data);
  }

  validerAno(id: any): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/ano/valider/'+id);
  }

  getAnoActivitebudgetannuel(id: any): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/ano/activitebudgetannuel/'+id);
  }

  getCreateData(id: any){
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/ano/programme/composantes/activite/'+id);
  }
}

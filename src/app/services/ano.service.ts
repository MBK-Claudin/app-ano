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
    return this.http.post<any>('http://localhost:8000/api/insert/ano/', data);
  }

  getANO(): Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/ano');
  }
  
  getSelectANO(id: any):Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/select/ano/'+id);
  }

  editAno(data: any){
    return this.http.post<any>('http://localhost:8000/api/edit/ano', data);
  }

  deleteAno(id: any){
    return this.http.delete<any>('http://localhost:8000/api/delete/ano/'+id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectifServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getobjectifs():Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/objectifs');
  }

  insertObjectif(data: any):Observable<any>{
    return this.http.post<any>('http://127.0.0.1:8000/api/insert/objectif/', data);
  }

  selectEditObjectif(id: any):Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/select/edit/objectif/'+id);
  }

  selectObjectif(id: any):Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/select/edit/objectif/'+id);
  }

  editObjectif(data: any):Observable<any>{
    return this.http.put<any>('http://127.0.0.1:8000/api/edit/objectif/', data);
  }

  deleteObjectif(id: any){
    return this.http.delete<any>("http://localhost:8000/api/delete/objectif/"+id);
  }

  getProgrammeObjectif(id: any){
    return this.http.get<any>("http://localhost:8000/api/objectif/programme/"+id);
  }
}

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
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/objectifs');
  }

  insertObjectif(data: any):Observable<any>{
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/insert/objectif/', data);
  }

<<<<<<< Updated upstream
  selectObjectif(id: any):Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/select/objectif/'+id);
=======
  selectEditObjectif(id: any):Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/select/edit/objectif/'+id);
  }

  selectObjectif(id: any):Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/select/edit/objectif/'+id);
>>>>>>> Stashed changes
  }

  editObjectif(data: any):Observable<any>{
    return this.http.put<any>('https://cgpgabon24.alwaysdata.net/api/edit/objectif/', data);
  }

  deleteObjectif(id: any){
    return this.http.delete<any>("https://cgpgabon24.alwaysdata.net/api/delete/objectif/"+id);
  }

  getProgrammeObjectif(id: any){
    return this.http.get<any>("https://cgpgabon24.alwaysdata.net/api/objectif/programme/"+id);
  }
}

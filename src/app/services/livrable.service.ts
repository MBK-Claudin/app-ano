import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivrableService {

  constructor(
    private http: HttpClient
  ) { }

  insertLivrable(data: any): Observable<any>{
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/insert/livrable', data);
  }

  getLivrable(id: any): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/livrable/'+id);
  }
}

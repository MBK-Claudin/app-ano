import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgrammeServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getProgramme():Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/programmes');
  }

  insertProgramme(data: any):Observable<any>{
    return this.http.post<any>('http://localhost:8000/api/insert/programme' , data)
  }
}

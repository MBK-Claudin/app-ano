import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(
    private http: HttpClient,
  ) { }

  getContracts(id: any): Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/contracts/'+id);
  }

  insertContracts(data: any):Observable<any>{
    return this.http.post<any>('http://localhost:8000/api/insert/contract', data);
  }
}

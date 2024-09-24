import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContributeurServicesService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers():Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/contributeurs');
  }
}

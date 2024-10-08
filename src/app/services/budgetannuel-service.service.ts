import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetannuelServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  insertBudgetAnnuel(data: any):Observable<any>{
    return this.http.post<any>('http://localhost:8000/api/insert/budgetannuel/', data);
  }

  getDetails(id: any):Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/details/budgetannuel/'+id);
  }

  getBudget(id: any):Observable<any>{
    return this.http.get<any>('http://localhost:8000/api/budgetannuels/'+id);
  }

  getActivites():Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/budgetannuel/activites');
  }

  getOneActivite(id: any):Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/budgetannuel/activite/'+id);
  }
}

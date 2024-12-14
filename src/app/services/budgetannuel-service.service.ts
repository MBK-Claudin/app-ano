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
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/insert/budgetannuel', data);
  }

  getDetails(id: any):Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/details/budgetannuel/'+id);
  }

  getBudget(id: any):Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/budgetannuels/'+id);
  }

  getAllBudget():Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/all/budgetannuels');
  }

  getActivites():Observable<any> {
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/budgetannuel/activites');
  }

  getOneActivite(id: any):Observable<any> {
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/budgetannuel/activite/'+id);
  }

  deleteActivite(id: any): Observable<any>{
    return this.http.delete<any>('https://cgpgabon24.alwaysdata.net/api/budgetannuel/delete/activite/'+id);
  }

  getPlaningData(id: any): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/budgetannuel/activite/planing/data/'+id);
  }
}

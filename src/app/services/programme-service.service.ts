import { DataServiceService } from './data-service.service';
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
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/programmes');
  }

  insertProgramme(data: any):Observable<any>{
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/insert/programme' , data)
  }

  selectProgramme(id: any):Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/select/programme/'+id);
  }

<<<<<<< Updated upstream
=======
  selectEditProgramme(id: any):Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/select/edit/programme/'+id);
  }

>>>>>>> Stashed changes
  editProgramme(data: any):Observable<any>{
    return this.http.put<any>('https://cgpgabon24.alwaysdata.net/api/edit/programme', data);
  }

  insertBudgetAnnuel(data: any):Observable<any>{
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/insert/budgetannuel', data);
  }

  planingData(id :any):Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/programme/planing/'+id);
  }

  deleteProgramme(id: any):Observable<any>{
    return this.http.delete<any>("https://cgpgabon24.alwaysdata.net/api/delete/programme/"+id);
  }

  getDataPlaning(id: any): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/programme/planing/data/'+id);
  }

  getDataPlanTransformation(id: any){
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/programme/planTrasnformation/'+id);
  }

}

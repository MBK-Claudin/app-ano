import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImpactService {
  constructor(private http: HttpClient) {}

<<<<<<< Updated upstream
  // Méthode pour récupérer un impact spécifique par son ID
  getImpacts(id: any): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/impacts/' + id);  // Assurez-vous que l'URL est correcte
=======
  getImpacts(programmeId: any): Observable<any> {
    // URL de base pour les missions
    const url = `https://cgpgabon24.alwaysdata.net/api/impacts/${programmeId}`;

    // Faites la requête GET en utilisant l'ID du programme comme paramètre
    return this.http.get<any>(url);
  }

  getAcitviteProgramme(id: any): Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/budgetannuel/activite/'+id);
  }

  insertImpact(data: any): Observable<any>{
    return this.http.post<any>('https://cgpgabon24.alwaysdata.net/api/impacts/insert/', data);
>>>>>>> Stashed changes
  }
}

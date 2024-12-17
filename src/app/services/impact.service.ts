import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImpactService {
  private apiUrl = 'https://cgpgabon24.alwaysdata.net/api/impacts';  // URL de base pour l'API des impacts

  constructor(private http: HttpClient) {}

  // Récupère les impacts d'un programme en particulier
  getImpacts(programmeId: any): Observable<any> {
    const url = `${this.apiUrl}/${programmeId}`;
    return this.http.get<any>(url);
  }

  // Récupère les activités associées à un programme
  getActiviteProgramme(id: any): Observable<any> {
    return this.http.get<any>(`https://cgpgabon24.alwaysdata.net/api/budgetannuel/activite/${id}`);
  }

  // Insère un nouvel impact
  insertImpact(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insert`, data);
  }

  // Met à jour un impact existant
  updateImpact(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Supprime un impact spécifique
  deleteImpact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

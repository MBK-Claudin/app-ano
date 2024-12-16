import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modèle de financement pour typage
interface Financement {

  id: number;
  programme_id: number;
  type_financement: string;
  montant: number;
  principale: string;
  budget_annuel_id: number;
  organisation_id: number;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class FinancementsService {

  private apiUrl = 'https://cgpgabon24.alwaysdata.net/api/financement';  // URL de l'API Laravel

  constructor(private http: HttpClient) { }

  // Récupérer la liste des financements pour un programme
  getFinancements(programmeId: number): Observable<Financement[]> {
    return this.http.get<Financement[]>(`${this.apiUrl}/${programmeId}`);
  }

  // Créer un financement
  createFinancement(financementData: Partial<Financement>): Observable<any> {
    return this.http.post(`${this.apiUrl}/insert`, financementData);
  }

  getOrganisations():Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/organisations');
  }

  // Récupérer un financement spécifique pour l'édition
  getFinancementById(financementId: number): Observable<Financement> {
    return this.http.get<Financement>(`${this.apiUrl}/${financementId}`);
  }

  // Mettre à jour un financement
  updateFinancement(financementId: number, financementData: Partial<Financement>): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${financementId}`, financementData);
  }

  // Supprimer un financement
  deleteFinancement(financementId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${financementId}`);
  }
}

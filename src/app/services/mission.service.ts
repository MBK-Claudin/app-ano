import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private apiUrl = 'http://localhost:8000/api/missions/'; // Adaptez l'URL à votre configuration

  constructor(private http: HttpClient) { }

  // Récupérer la liste des missions
 // mission.service.ts

getMissions(programmeId: any): Observable<any> {
  // URL de base pour les missions
  const url = `https://cgpgabon24.alwaysdata.net/api/mission/${programmeId}`;

  // Faites la requête GET en utilisant l'ID du programme comme paramètre
  return this.http.get<any>(url);
}


  createMission(data: any): Observable<any> {
    return this.http.post('https://cgpgabon24.alwaysdata.net/api/mission/insert', data, {
    });
  }

  getdetailMission(id: any):Observable<any>{
    return this.http.get<any>('https://cgpgabon24.alwaysdata.net/api/mission'+id);
  }
}

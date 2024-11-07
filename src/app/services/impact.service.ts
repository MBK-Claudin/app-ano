import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImpactService {
  constructor(private http: HttpClient) {}

  // Méthode pour récupérer un impact spécifique par son ID
  getImpacts(id: any): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/impacts/' + id);  // Assurez-vous que l'URL est correcte
  }
}

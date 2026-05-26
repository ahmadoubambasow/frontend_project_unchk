import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormationRequest } from '../models/formation-request.model';
import { Formation } from '../models/formation.model';

@Injectable({
  providedIn: 'root',
})
export class FormationService {

  /**
   * URL backend
   */
  private apiUrl = 'http://localhost:8080/api/formations';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Liste formations
   */
  getFormations(): Observable<Formation[]> {

    return this.http.get<Formation[]>(this.apiUrl);
  }

  /**
   * Création formation
   */
  createFormation(request: FormationRequest): Observable<Formation> {

    return this.http.post<Formation>(this.apiUrl, request);
  }

  /**
   * Modification formation
   */
  updateFormation(id: number, request: FormationRequest): Observable<Formation> {

    return this.http.put<Formation>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Suppression formation
   */
  deleteFormation(id: number): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

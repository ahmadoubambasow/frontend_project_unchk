import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormationRequest } from '../models/formation-request.model';
import { Formation } from '../models/formation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormationService {

  /**
   * URL backend
   */
  private apiUrl = environment.apiUrl + 'formations';

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
   * Formation par id
   */
  getById(id: number): Observable<Formation> {

    return this.http.get<Formation>(`${this.apiUrl}/${id}`);
  }

  /**
   * Création formation
   */
  createFormation(request: Formation): Observable<Formation> {

    return this.http.post<Formation>(this.apiUrl, request);
  }

  /**
   * Modification formation
   */
  updateFormation(id: number, formation: any): Observable<Formation> {

    return this.http.put<Formation>(`${this.apiUrl}/${id}`, formation);
  }

  /**
   * Suppression formation
   */
  deleteFormation(id: number): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

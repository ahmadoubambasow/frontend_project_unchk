import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingModule } from '../models/training-module.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingModuleService {

  /**
   * API URL
   */
  private apiUrl = 'http://localhost:8080/api/training-modules';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupérer tous les modules
   * @returns 
   */
  getModules():
    Observable<TrainingModule[]> {

      return this.http.get<TrainingModule[]>(

        this.apiUrl
      );
  }

  /**
   * Récupérer tous les modules d'une formation
   * @param formationId 
   * @returns 
   */
  getByFormation(
    formationId: number
  ): Observable<TrainingModule[]> {

    return this.http.get<TrainingModule[]>(

      `${this.apiUrl}/formation/${formationId}`
    );
  }

  /**
   * Créer un module
   * @param request 
   * @returns 
   */
  create(
    request: any
  ): Observable<TrainingModule> {

    return this.http.post<TrainingModule>(
      this.apiUrl,
      request
    );
  }

  /**
   * Modifier un module
   * @param id 
   * @param request 
   * @returns 
   */
  update(
    id: number,
    request: any
  ): Observable<TrainingModule> {

    return this.http.put<TrainingModule>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  /**
   * Supprimer un module
   * @param id 
   * @returns 
   */
  delete(
    id: number
  ) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}

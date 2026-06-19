import {
  HttpClient
} from '@angular/common/http';

import {
  Injectable
} from '@angular/core';

import {
  Observable
} from 'rxjs';

import {
  GraduateInsertion
} from '../models/graduate-insertion.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraduateInsertionService {

  /**
   * API URL
   */
  private apiUrl =
    environment.apiUrl + 'graduate-insertions';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupérer tous les étudiants inserés
   * @returns 
   */
  getAll():
    Observable<GraduateInsertion[]> {

    return this.http.get<GraduateInsertion[]>(
      this.apiUrl
    );
  }

  /**
   * Récupérer un étudiant insérer
   * @param id 
   * @returns 
   */
  getById(
    id: number
  ): Observable<GraduateInsertion> {

    return this.http.get<GraduateInsertion>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Création d'un étudiant insérer
   * @param request 
   * @returns 
   */
  create(
    request: any
  ) {

    return this.http.post(
      this.apiUrl,
      request
    );
  }

  /**
   * Mise à jour d'un étudiant insérer
   * @param id 
   * @param request 
   * @returns 
   */
  update(
    id: number,
    request: any
  ) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  /**
   * Suppression d'un étudiant insérer
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
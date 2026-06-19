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
  Budget
} from '../models/budget.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  /**
   * URL de l'API
   */
  private apiUrl =
    environment.apiUrl + 'budgets';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupère tous les budgets
   * @returns 
   */
  getAll():
    Observable<Budget[]> {

    return this.http.get<Budget[]>(
      this.apiUrl
    );
  }

  /**
   * Récupère un budget
   * @param id 
   * @returns 
   */
  getById(
    id: number
  ): Observable<Budget> {

    return this.http.get<Budget>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Création d'un budget
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
   * Mise à jour d'un budget
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
   * Suppression d'un budget
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

  /**
   * Chargement du fichier
   * @param formData 
   * @returns 
   */
  uploadFile(
    formData: FormData
  ) {

    return this.http.post<{filePath:string}>(
      `${this.apiUrl}/upload`,
      formData
    );
  }
}
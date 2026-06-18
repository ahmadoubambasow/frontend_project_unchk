import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Partner
} from '../models/partner.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  /**
   * URL de l'API
   */
  private apiUrl =
    'http://localhost:8080/api/partners';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupérer tous les partenaires
   * @returns 
   */
  getAll(): Observable<Partner[]> {

    return this.http.get<Partner[]>(
      this.apiUrl
    );
  }

  /**
   * Récupérer un partenaire
   */
  getById(
    id: number
  ): Observable<Partner> {

    return this.http.get<Partner>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Création d'un partenaire
   */
  create(
    request: any
  ): Observable<Partner> {

    return this.http.post<Partner>(
      this.apiUrl,
      request
    );
  }

  /**
   * Mise à jour d'un partenaire
   */
  update(
    id: number,
    request: any
  ): Observable<Partner> {

    return this.http.put<Partner>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  /**
   * Suppression d'un partenaire
   */
  delete(
    id: number
  ) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Internship } from '../models/internship.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  /**
   * URL de l'API
   */
  private apiUrl =
    environment.apiUrl + 'internships';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupérer tous les stages
   * @returns 
   */
  getAll() {

    return this.http.get<Internship[]>(
      this.apiUrl
    );
  }

  /**
   * Récupérer un stage
   * @param id 
   * @returns 
   */
  getById(
    id: number
  ) {

    return this.http.get<Internship>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Création d'un stage
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
   * Mise à jour d'un stage
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
   * Suppression d'un stage
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
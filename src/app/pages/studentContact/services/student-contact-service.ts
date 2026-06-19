import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentContact } from '../models/Student-contact.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentContactService {

  /**
   * URL Api
   */
  private apiUrl =
    environment.apiUrl + 'student-contacts';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupérer tous les contacts
   * @returns 
   */
  getAll() {

    return this.http.get<StudentContact[]>(
      this.apiUrl
    );
  }

  /**
   * Récupérer tous les contacts d'un etudiant
   * @param studentId 
   * @returns 
   */
  getByStudent(
    studentId: number
  ) {

    return this.http.get<StudentContact[]>(

      `${this.apiUrl}/student/${studentId}`
    );
  }

  /**
   * Création d'un contact
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
   * Mise à jour d'un contact
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
   * Suppression d'un contact
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
   * Récupérer un contact
   * @param id 
   * @returns 
   */
  getById(
    id: number
  ) {

    return this.http.get<StudentContact>(

      `${this.apiUrl}/${id}`
    );
  }
}

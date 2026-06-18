import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Student
} from '../models/student.model';
import { StudentGroup } from '../models/student-group.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  /**
   * URL de l'api
   */
  private apiUrl =
    'http://localhost:8080/api/students';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupérer tous les étudiants
   * @returns 
   */
  getStudents():
    Observable<Student[]> {

    return this.http.get<Student[]>(
      this.apiUrl
    );
  }

  /**
   * Récupérer un étudiant
   * @param id 
   * @returns 
   */
  getById(
    id: number
  ): Observable<Student> {

    return this.http.get<Student>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Créer un étudiant
   * @param request 
   * @returns 
   */
  create(
    request: any
  ): Observable<Student> {

    return this.http.post<Student>(
      this.apiUrl,
      request
    );
  }

  /**
   * Modifier un étudiant
   * @param id 
   * @param request 
   * @returns 
   */
  update(
    id: number,
    request: any
  ): Observable<Student> {

    return this.http.put<Student>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  /**
   * Supprimer un étudiant
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
   * Récupérer tous les étudiants d'un groupe
   * @param groupId 
   * @returns 
   */
  getStudentsByGroup(
    groupId: number
  ) {

    return this.http.get<Student[]>(
      `${this.apiUrl}/group/${groupId}`
    );
  }
}
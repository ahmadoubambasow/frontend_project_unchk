import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrainerSubject } from '../models/trainer-subject.model';
import { TrainerSubjectRequest } from '../models/trainer-subject-request.model';

@Injectable({
  providedIn: 'root',
})
export class TrainerSubjectService {

  /**
   * API URL
   */
  private apiUrl = 'http://localhost:8080/api/trainer-subjects';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Retourne la liste des formations d'un formateur
   */
  getAssignments() {

    return this.http.get<TrainerSubject[]>(this.apiUrl);
  }

  /**
   * Créer Assignation
   */
  createAssignment(request: TrainerSubjectRequest) {

    return this.http.post<TrainerSubject>(this.apiUrl, request);
  }

  /**
   * Modification
   */
  updateAssignation() {}


  /**
   * Suppimer assignation
   */
  deleteAssignment(id: number) {

    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}

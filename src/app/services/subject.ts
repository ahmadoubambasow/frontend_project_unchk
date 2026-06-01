import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject.model';
import { SubjectRequest } from '../models/subject-request.model';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {

  /**
   * API URL
   */
  private apiUrl = 'http://localhost:8080/api/subjects';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Liste matières
   */
  getSubjects(): Observable<Subject[]> {

    return this.http.get<Subject[]>(this.apiUrl);
  }

  /**
   * Matières d'une formation
   */
  getSubjectByFormation(formationId: number): Observable<Subject[]> {

    return this.http.get<Subject[]>(`${this.apiUrl}/formation/${formationId}`);
  }

  /**
   * Création
   */
  createSubject(request: SubjectRequest): Observable<Subject> {

    return this.http.post<Subject>(this.apiUrl, request);
  }

  /**
   * Modification
   */
  updateSubject(id: number, request: SubjectRequest): Observable<Subject> {

    return this.http.put<Subject>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Suppression
   */
  deleteSubject(id: number): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

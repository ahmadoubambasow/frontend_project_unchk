import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';
import { EnrollmentRequest } from '../models/enrollment-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {

  /**
   * URL API
   */
  private apiUrl = environment.apiUrl + 'enrollments';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Liste inscription
   */
  getEnrollments(): Observable<Enrollment[]> {

    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  /**
   * Création inscription
   */
  createEnrollment(
    request: EnrollmentRequest
  ): Observable<Enrollment> {

    return this.http.post<Enrollment>(this.apiUrl, request);
  }

  /**
   * Modification inscription
   */
  updateEnrollment(
    id: number,
    request: EnrollmentRequest
  ): Observable<Enrollment> {

    return this.http.put<Enrollment>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Suppression inscription
   */
  deleteEnrollment(id: number): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

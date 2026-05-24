import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { StudentRequest } from '../models/student-request.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  /**
   * URL backend
   */
  private apiUrl = 'http://localhost:8080/api/students';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Liste des étudiants
   */
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  /**
   * Création étudiant
   */
  createStudent(request: StudentRequest): Observable<Student> {

    return this.http.post<Student>(this.apiUrl, request);
  }
}

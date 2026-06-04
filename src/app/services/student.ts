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

  private apiUrl =
    'http://localhost:8080/api/students';

  constructor(
    private http: HttpClient
  ) {}

  getStudents():
    Observable<Student[]> {

    return this.http.get<Student[]>(
      this.apiUrl
    );
  }

  getById(
    id: number
  ): Observable<Student> {

    return this.http.get<Student>(
      `${this.apiUrl}/${id}`
    );
  }

  create(
    request: any
  ): Observable<Student> {

    return this.http.post<Student>(
      this.apiUrl,
      request
    );
  }

  update(
    id: number,
    request: any
  ): Observable<Student> {

    return this.http.put<Student>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  delete(
    id: number
  ) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

  getStudentsByGroup(
    groupId: number
  ) {

    return this.http.get<Student[]>(
      `${this.apiUrl}/group/${groupId}`
    );
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentContact } from '../models/Student-contact.model';

@Injectable({
  providedIn: 'root'
})
export class StudentContactService {

  private apiUrl =
    'http://localhost:8080/api/student-contacts';

  constructor(
    private http: HttpClient
  ) {}

  getAll() {

    return this.http.get<StudentContact[]>(
      this.apiUrl
    );
  }

  getByStudent(
    studentId: number
  ) {

    return this.http.get<StudentContact[]>(

      `${this.apiUrl}/student/${studentId}`
    );
  }

  create(
    request: any
  ) {

    return this.http.post(
      this.apiUrl,
      request
    );
  }

  update(
    id: number,
    request: any
  ) {

    return this.http.put(

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

  getById(
    id: number
  ) {

    return this.http.get<StudentContact>(

      `${this.apiUrl}/${id}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Internship } from '../models/internship.model';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  private apiUrl =
    'http://localhost:8080/api/internships';

  constructor(
    private http: HttpClient
  ) {}

  getAll() {

    return this.http.get<Internship[]>(
      this.apiUrl
    );
  }

  getById(
    id: number
  ) {

    return this.http.get<Internship>(
      `${this.apiUrl}/${id}`
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
}
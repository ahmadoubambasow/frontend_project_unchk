import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StudentGroup } from '../models/student-group.model';

@Injectable({
  providedIn: 'root',
})
export class StudentGroupService {

  /**
   * API URL
   */
  private apiUrl =
    'http://localhost:8080/api/student-groups';

  constructor(
    private http: HttpClient
  ) {}

  getGroups():
    Observable<StudentGroup[]> {

    return this.http.get<StudentGroup[]>(
      this.apiUrl
    );
  }

  getGroupById(
    id: number
  ) {

    return this.http.get<StudentGroup>(

      `${this.apiUrl}/${id}`
    );
  }

  create(
    request: any
  ): Observable<StudentGroup> {

    return this.http.post<StudentGroup>(
      this.apiUrl,
      request
    );
  }

  update(
    id: number,
    request: any
  ): Observable<StudentGroup> {

    return this.http.put<StudentGroup>(
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
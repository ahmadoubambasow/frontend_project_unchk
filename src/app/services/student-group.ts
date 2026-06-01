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
    'http://localhost:8080/api/groups';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Liste des groupes
   */
  getGroups():
    Observable<StudentGroup[]> {

    return this.http.get<StudentGroup[]>(
      this.apiUrl
    );
  }

  /**
   * Groupes d'une formation
   */
  getGroupsByFormation(
    formationId: number
  ): Observable<StudentGroup[]> {

    return this.http.get<StudentGroup[]>(

      `${this.apiUrl}/formation/${formationId}`
    );
  }

  /**
   * Création groupe
   */
  createGroup(
    group: any
  ): Observable<StudentGroup> {

    return this.http.post<StudentGroup>(
      this.apiUrl,
      group
    );
  }

  /**
   * Mise à jour groupe
   */
  updateGroup(
    id: number,
    group: any
  ): Observable<StudentGroup> {

    return this.http.put<StudentGroup>(
      `${this.apiUrl}/${id}`,
      group
    );
  }

  /**
   * Suppression groupe
   */
  deleteGroup(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
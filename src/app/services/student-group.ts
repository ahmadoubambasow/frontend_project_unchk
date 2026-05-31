import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentGroup } from '../models/student-group.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentGroupService {

  /**
   * API URL
   */
  private apiUrl = 'http://localhost:8080/api/groups';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Liste des groupes
   */
  getGroups(): Observable<StudentGroup[]> {
    return this.http.get<StudentGroup[]>(this.apiUrl);
  }

  getGroupsByPromotion(promotionId: number): Observable<StudentGroup[]> {
   
    return this.http.get<StudentGroup[]>(`${this.apiUrl}/promotion/${promotionId}`);
  }

}

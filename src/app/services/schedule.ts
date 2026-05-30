import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {

  /**
   * URL de l'API
   */
  private apiUrl = 'http://localhost:8080/api/schedules'

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Liste séances
   */
  getSchedules(): Observable<Schedule[]> {

    return this.http.get<Schedule[]>(this.apiUrl);
  }

  /**
   * Création
   */
  createSchedule(request: any): Observable<Schedule> {

    return this.http.post<Schedule>(this.apiUrl, request);
  }

  /**
   * Modification
   */
  updateSchedule(id: number, request: any): Observable<Schedule> {

    return this.http.put<Schedule>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Suppression
   */
  deleteSchedule(id: number): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Schedule
} from '../models/schedule.model';

import {
  ScheduleRequest
} from '../models/schedule-request.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  /**
   * API URL
   */
  private apiUrl =
    'http://localhost:8080/api/schedules';

  constructor(

    private http:
      HttpClient

  ) {}

  /**
   * Récupérer tous les emplois du temps
   * @returns 
   */
  getSchedules():
  Observable<Schedule[]> {

    return this.http.get<Schedule[]>(
      this.apiUrl
    );
  }

  /**
   * Récupérer mon emploi du temps
   * @returns 
   */
  getMySchedule()
  : Observable<Schedule[]> {

    return this.http.get<Schedule[]>(

      `${this.apiUrl}/my-schedule`
    );
  }

  /**
   * Récupérer un emploi du temps
   * @param id 
   * @returns 
   */
  getById(
    id: number
  ): Observable<Schedule> {

    return this.http.get<Schedule>(

      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Récupérer tous les emplois du temps d'un groupe
   * @param groupId 
   * @returns 
   */
  getGroupSchedules(
    groupId: number
  ): Observable<Schedule[]> {

    return this.http.get<Schedule[]>(

      `${this.apiUrl}/group/${groupId}`
    );
  }

  /**
   * Récupérer tous les emplois du temps d'un trainer
   * @param trainerId 
   * @returns 
   */
  getTrainerSchedules(
    trainerId: number
  ): Observable<Schedule[]> {

    return this.http.get<Schedule[]>(

      `${this.apiUrl}/trainer/${trainerId}`
    );
  }

  /**
   * Créer un emploi du temps
   * @param request 
   * @returns 
   */
  create(
    request: ScheduleRequest
  ): Observable<Schedule> {

    return this.http.post<Schedule>(

      this.apiUrl,

      request
    );
  }

  /**
   * Modifier un emploi du temps
   * @param id 
   * @param request 
   * @returns 
   */
  update(

    id: number,

    request: ScheduleRequest

  ): Observable<Schedule> {

    return this.http.put<Schedule>(

      `${this.apiUrl}/${id}`,

      request
    );
  }

  /**
   * Supprimer un emploi du temps
   * @param id 
   * @returns 
   */
  delete(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(

      `${this.apiUrl}/${id}`
    );
  }
}
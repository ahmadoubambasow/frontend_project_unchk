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

  private apiUrl =
    'http://localhost:8080/api/schedules';

  constructor(

    private http:
      HttpClient

  ) {}

  getSchedules():
  Observable<Schedule[]> {

    return this.http.get<Schedule[]>(
      this.apiUrl
    );
  }

  getMySchedule()
  : Observable<Schedule[]> {

    return this.http.get<Schedule[]>(

      `${this.apiUrl}/my-schedule`
    );
  }

  getById(
    id: number
  ): Observable<Schedule> {

    return this.http.get<Schedule>(

      `${this.apiUrl}/${id}`
    );
  }

  getGroupSchedules(
    groupId: number
  ): Observable<Schedule[]> {

    return this.http.get<Schedule[]>(

      `${this.apiUrl}/group/${groupId}`
    );
  }

  getTrainerSchedules(
    trainerId: number
  ): Observable<Schedule[]> {

    return this.http.get<Schedule[]>(

      `${this.apiUrl}/trainer/${trainerId}`
    );
  }

  create(
    request: ScheduleRequest
  ): Observable<Schedule> {

    return this.http.post<Schedule>(

      this.apiUrl,

      request
    );
  }

  update(

    id: number,

    request: ScheduleRequest

  ): Observable<Schedule> {

    return this.http.put<Schedule>(

      `${this.apiUrl}/${id}`,

      request
    );
  }

  delete(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(

      `${this.apiUrl}/${id}`
    );
  }
}
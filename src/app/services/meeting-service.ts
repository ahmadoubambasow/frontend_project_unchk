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
  Meeting
} from '../models/meeting.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private apiUrl =
    'http://localhost:8080/api/meetings';

  constructor(
    private http: HttpClient
  ) {}

  getMeetings():
  Observable<Meeting[]> {

    return this.http.get<Meeting[]>(

      this.apiUrl
    );
  }

  getMyMeetings():
  Observable<Meeting[]> {

    return this.http.get<Meeting[]>(

      `${this.apiUrl}/my-meetings`
    );
  }

  getById(
    id: number
  ): Observable<Meeting> {

    return this.http.get<Meeting>(

      `${this.apiUrl}/${id}`
    );
  }

  create(
    request: any
  ): Observable<Meeting> {

    return this.http.post<Meeting>(

      this.apiUrl,

      request
    );
  }

  update(
    id: number,
    request: any
  ): Observable<Meeting> {

    return this.http.put<Meeting>(

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
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

  /**
   * URL de l'API
   */
  private apiUrl =
    'http://localhost:8080/api/meetings';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupérer toutes les réunions
   * @returns 
   */
  getMeetings():
  Observable<Meeting[]> {

    return this.http.get<Meeting[]>(

      this.apiUrl
    );
  }

  /**
   * Récupérer mes réunions
   * @returns 
   */
  getMyMeetings():
  Observable<Meeting[]> {

    return this.http.get<Meeting[]>(

      `${this.apiUrl}/my-meetings`
    );
  }

  /**
   * Récupérer une réunion
   * @param id 
   * @returns 
   */
  getById(
    id: number
  ): Observable<Meeting> {

    return this.http.get<Meeting>(

      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Créer une réunion
   * @param request 
   * @returns 
   */
  create(
    request: any
  ): Observable<Meeting> {

    return this.http.post<Meeting>(

      this.apiUrl,

      request
    );
  }

  /**
   * Modifier une réunion
   * @param id 
   * @param request 
   * @returns 
   */
  update(
    id: number,
    request: any
  ): Observable<Meeting> {

    return this.http.put<Meeting>(

      `${this.apiUrl}/${id}`,

      request
    );
  }

  /**
   * Supprimer une réunion
   * @param id 
   * @returns 
   */
  delete(
    id: number
  ) {

    return this.http.delete(

      `${this.apiUrl}/${id}`
    );
  }
}
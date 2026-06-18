import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Notification } from '../models/notification.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  /**
   * API URL
   */
  private apiUrl =
    environment.apiUrl + 'notifications';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Mes notifications
   */
  getMyNotifications():
    Observable<Notification[]> {

    return this.http.get<Notification[]>(
      `${this.apiUrl}/me`
    );
  }

  /**
   * Nombre de notifications non lues
   */
  getUnreadCount():
    Observable<number> {

    return this.http.get<number>(
      `${this.apiUrl}/unread-count`
    );
  }

  /**
   * Marquer comme lu
   */
  markAsRead(
    id: number
  ): Observable<void> {

    return this.http.put<void>(
      `${this.apiUrl}/${id}/read`,
      {}
    );
  }
}
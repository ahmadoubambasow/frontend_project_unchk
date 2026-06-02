import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  CommonModule,
  DatePipe
} from '@angular/common';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatToolbarModule
} from '@angular/material/toolbar';

import {
  MatMenuModule
} from '@angular/material/menu';

import {
  MatBadgeModule
} from '@angular/material/badge';

import {
  interval,
  Subscription
} from 'rxjs';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

import { NotificationService } from '../../services/notification-service';

import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-topbar',

  imports: [
    CommonModule,
    DatePipe,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
  ],

  templateUrl: './topbar.html',

  styleUrl: './topbar.scss',
})
export class Topbar
implements OnInit, OnDestroy {

  notifications: Notification[] = [];

  unreadCount = 0;

  private refreshSubscription?: Subscription;

  constructor(

    private authService: AuthService,

    private router: Router,

    private notificationService:
      NotificationService

  ) {}

  ngOnInit(): void {

    this.loadNotifications();

    this.refreshSubscription =

      interval(30000)

        .subscribe(() => {

          this.loadNotifications();
        });
  }

  ngOnDestroy(): void {

    this.refreshSubscription?.unsubscribe();
  }

  /**
   * Chargement notifications
   */
  loadNotifications(): void {

    this.notificationService

      .getMyNotifications()

      .subscribe({

        next: (response) => {

          this.notifications = [...response]

            .sort((a, b) =>

              new Date(b.createdAt).getTime()

              -

              new Date(a.createdAt).getTime()

            );

          this.updateUnreadCount();
        },

        error: (error) => {

          console.error(error);
        }
      });
  }

  /**
   * Calcul nombre non lues
   */
  updateUnreadCount(): void {

    this.unreadCount =

      this.notifications.filter(

        notification => !notification.isRead

      ).length;
  }

  /**
   * Marquer comme lu
   */
  markAsRead(
    notification: Notification
  ): void {

    if (notification.isRead) {

      return;
    }

    this.notificationService

      .markAsRead(
        notification.id
      )

      .subscribe({

        next: () => {

          notification.isRead = true;

          this.updateUnreadCount();
        },

        error: (error) => {

          console.error(error);
        }
      });
  }

  /**
   * Tout marquer comme lu
   */
  markAllAsRead(): void {

    this.notifications.forEach(

      notification =>

        notification.isRead = true

    );

    this.updateUnreadCount();
  }

  /**
   * Logout
   */
  logout(): void {

    this.authService.logout();

    this.router.navigate(
      ['/login']
    );
  }
}
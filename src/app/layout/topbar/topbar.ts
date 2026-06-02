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

  showNotifications = false;

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

    this.loadUnreadCount();

    this.refreshSubscription =

      interval(30000)

        .subscribe(() => {

          this.loadNotifications();

          this.loadUnreadCount();
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

          this.notifications = response;
        },

        error: (error) => {

          console.error(error);
        }
      });
  }

  /**
   * Nombre non lues
   */
  loadUnreadCount(): void {

    this.notificationService

      .getUnreadCount()

      .subscribe({

        next: (count) => {

          this.unreadCount = count;
        },

        error: (error) => {

          console.error(error);
        }
      });
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

          this.loadUnreadCount();
        },

        error: (error) => {

          console.error(error);
        }
      });
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
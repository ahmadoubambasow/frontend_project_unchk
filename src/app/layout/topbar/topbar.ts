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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NotificationView } from '../../shared/notification-view/notification-view';
import { NotificationsDialogComponent } from '../../shared/notifications-dialog-component/notifications-dialog-component';

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
    MatDialogModule
  ],

  templateUrl: './topbar.html',

  styleUrl: './topbar.scss',
})
export class Topbar implements OnInit, OnDestroy {

  /**
   * Notifications
   */
  notifications: Notification[] = [];

  /**
   * Nombre non lues
   */
  unreadCount = 0;

  /**
   * Abonnement
   */
  private refreshSubscription?: Subscription;

  /**
   * Notifications recents
   */
  get recentNotifications(): Notification[] {

    return this.notifications.slice(0, 3);
  }

  constructor(

    private authService: 
      AuthService,

    private router: 
      Router,

    private notificationService: 
      NotificationService,

    private dialog: 
      MatDialog

  ) {}

  ngOnInit(): void {

    this.loadNotifications();

    this.refreshSubscription =

      interval(30000)

        .subscribe(() => {

          this.loadNotifications();
        });
  }

  /**
   * Destruction
   */
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

          if (notification.targetUrl) {

            this.router.navigateByUrl(
              notification.targetUrl
            );
          }
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

  openNotification(
    notification: Notification
  ): void {

    this.markAsRead(notification);

    this.dialog.open(
      NotificationView,
      {

        width: '500px',

        maxWidth: '95vw',

        data: notification
      }
    );
  }

  /**
   * Ouvrir page notifications
   */
  openNotificationsPage(): void {

    this.router.navigate([
      '/notifications'
    ]);
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
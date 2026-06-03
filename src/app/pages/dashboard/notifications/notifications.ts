import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule,
  DatePipe
} from '@angular/common';

import {
  MatCardModule
} from '@angular/material/card';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import { Notification } from '../../../models/notification.model';

import { NotificationService }
from '../../../services/notification-service';
import { NotificationView } from '../../../shared/notification-view/notification-view';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notifications',

  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './notifications.html',

  styleUrl: './notifications.scss'
})
export class Notifications
implements OnInit {

  notifications: Notification[] = [];

  loading = false;

  constructor(

    private notificationService:
      NotificationService,

    private dialog: MatDialog

  ) {}

  ngOnInit(): void {

    this.loadNotifications();
  }

  loadNotifications(): void {

    this.loading = true;

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

          this.loading = false;
        },

        error: (error) => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  markAsRead(
    notification: Notification
  ): void {

    if (notification.isRead) {

      return;
    }

    this.notificationService

      .markAsRead(notification.id)

      .subscribe({

        next: () => {

          notification.isRead = true;
        }
      });
  }

  openNotification(
  notification: Notification
): void {

  if (!notification.isRead) {

    this.notificationService

      .markAsRead(notification.id)

      .subscribe({

        next: () => {

          notification.isRead = true;
        },

        error: (error) => {

          console.error(error);
        }
      });
  }

  this.dialog.open(
    NotificationView,
    {

      width: '600px',

      maxWidth: '95vw',

      data: notification
    }
  );
}
}
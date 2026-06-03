import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification-service';
import { Notification } from '../../models/notification.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatDialog } from '@angular/material/dialog';
import { NotificationView } from '../notification-view/notification-view';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-notifications-dialog-component',
  imports: [
    CommonModule,
    DatePipe,
    MatCard,
    MatCardContent,
    MatIcon
],
  templateUrl: './notifications-dialog-component.html',
  styleUrl: './notifications-dialog-component.scss',
})
export class NotificationsDialogComponent {

  notifications: Notification[] = [];

  constructor(

    private notificationService: NotificationService,

    private dialog: MatDialog
  ) {}

ngOnInit(): void {

  this.notificationService

    .getMyNotifications()

    .subscribe({

      next: (response) => {

        this.notifications = response
          .sort((a, b) =>

            new Date(b.createdAt).getTime()

            -

            new Date(a.createdAt).getTime()

          );
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

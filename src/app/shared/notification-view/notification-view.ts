import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-view',
  imports: [
    CommonModule,
    DatePipe
  ],
  templateUrl: './notification-view.html',
  styleUrl: './notification-view.scss',
})
export class NotificationView {

  constructor(

    @Inject(MAT_DIALOG_DATA)
    public notification: any
    
  ) {}
}

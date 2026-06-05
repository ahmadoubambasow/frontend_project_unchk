import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetingService } from '../../../services/meeting-service';
import { MatCard, MatCardTitle, MatCardHeader, MatCardContent } from "@angular/material/card";
import { Meeting } from '../../../models/meeting.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meeting-details',
  imports: [CommonModule, MatCard, MatCardTitle, MatCardHeader, MatCardContent],
  templateUrl: './meeting-details.html',
  styleUrl: './meeting-details.scss',
})
export class MeetingDetails
implements OnInit {

  meeting?: Meeting;

  loading = false;

  constructor(

    private route:
      ActivatedRoute,

    private meetingService:
      MeetingService,

      private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    const id = Number(

      this.route.snapshot
        .paramMap
        .get('id')
    );

    this.loadMeeting(id);
  }

  loadMeeting(
    id: number
  ): void {

    this.loading = true;

    this.meetingService

      .getById(id)

      .subscribe({

        next: response => {

          this.meeting =
            response;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }
}
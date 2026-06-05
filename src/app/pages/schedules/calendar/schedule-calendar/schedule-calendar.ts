import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';
import { Schedule } from '../../../../models/schedule.model';
import { ScheduleService } from '../../../../services/schedule';



@Component({
  selector: 'app-schedule-calendar',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './schedule-calendar.html',

  styleUrl:
    './schedule-calendar.scss'
})
export class ScheduleCalendar
implements OnInit {

  schedules: Schedule[] = [];

  loading = false;

  readonly days = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY'
  ];

  readonly hours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00'
  ];

  constructor(

    private scheduleService:
      ScheduleService

  ) {}

  ngOnInit(): void {

    this.loadSchedules();
  }

  loadSchedules(): void {

    this.loading = true;

    this.scheduleService

      .getMySchedule()

      .subscribe({

        next: response => {

          this.schedules =
            response;

          this.loading = false;
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  getDayLabel(
    day: string
  ): string {

    const labels: Record<string, string> = {

      MONDAY: 'Lundi',

      TUESDAY: 'Mardi',

      WEDNESDAY: 'Mercredi',

      THURSDAY: 'Jeudi',

      FRIDAY: 'Vendredi',

      SATURDAY: 'Samedi'
    };

    return labels[day];
  }

  getSchedulesByDay(
    day: string
  ): Schedule[] {

    return this.schedules

      .filter(

        schedule =>

          schedule.dayOfWeek === day
      )

      .sort(

        (a, b) =>

          a.startTime.localeCompare(
            b.startTime
          )
      );
  }

  getGridRow(
    schedule: Schedule
  ): string {

    const startHour = Number(

      schedule.startTime
        .substring(0, 2)
    );

    const endHour = Number(

      schedule.endTime
        .substring(0, 2)
    );

    const startRow =

      startHour - 8 + 2;

    const duration =

      endHour - startHour;

    return `${startRow} / span ${duration}`;
  }
}
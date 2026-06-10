import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatDialog
} from '@angular/material/dialog';

import {
  MatSnackBar
} from '@angular/material/snack-bar';

import {
  Schedule
} from '../../models/schedule.model';

import {
  ScheduleService
} from '../../services/schedule';

import {
  ScheduleFormDialog
} from './schedule-form-dialog/schedule-form-dialog';

import {
  ConfirmDialog
} from '../../shared/dialogs/confirm-dialog/confirm-dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-schedules',

  standalone: true,

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],

  templateUrl:
    './schedules.html',

  styleUrl:
    './schedules.scss'
})
export class Schedules
implements OnInit {

  schedules: Schedule[] = [];

  loading = false;

  constructor(

    private scheduleService:
      ScheduleService,

    private dialog:
      MatDialog,

    private snackBar:
      MatSnackBar,

      private cdr: ChangeDetectorRef
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

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        ScheduleFormDialog,

        {
          width: '850px',

          maxWidth: '95vw'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadSchedules();
        }
      });
  }

  openEditDialog(
    schedule: Schedule
  ): void {

    const dialogRef =

      this.dialog.open(

        ScheduleFormDialog,

        {

          width: '850px',

          maxWidth: '95vw',

          data: schedule
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadSchedules();
        }
      });
  }

  deleteSchedule(
    schedule: Schedule
  ): void {

    const dialogRef =

      this.dialog.open(

        ConfirmDialog,

        {

          width: '450px',

          data: {

            title:
              'Suppression',

            message:

              `Supprimer le cours "${schedule.moduleName}" ?`,

            confirmText:
              'Supprimer',

            cancelText:
              'Annuler'
          }
        }
      );

    dialogRef.afterClosed()

      .subscribe(

        confirmed => {

          if (!confirmed) {

            return;
          }

          this.scheduleService

            .delete(
              schedule.id
            )

            .subscribe({

              next: () => {

                this.snackBar.open(

                  'Créneau supprimé',

                  'Fermer',

                  {
                    duration: 3000
                  }
                );

                this.loadSchedules();
              }
            });
        }
      );
  }
}
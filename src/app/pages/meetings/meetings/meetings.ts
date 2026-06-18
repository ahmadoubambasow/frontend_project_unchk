import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  MatDialog
} from '@angular/material/dialog';

import {
  MatSnackBar
} from '@angular/material/snack-bar';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatInputModule
} from '@angular/material/input';

import { Meeting } from '../../../models/meeting.model';
import { MeetingService } from '../../../services/meeting-service';
import { MeetingFormDialog } from '../meetings-form-dialog/meetings-form-dialog';
import { ConfirmDialog } from '../../../shared/dialogs/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-meetings',

  standalone: true,

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],

  templateUrl: './meetings.html',

  styleUrl: './meetings.scss'
})
export class Meetings implements OnInit {

  /**
   * Liste des rencontres
   */
  meetings: Meeting[] = [];

  /**
   * Liste des rencontres filtrées
   */
  filteredMeetings: Meeting[] = [];

  /**
   * Indicateur de chargement
   */
  loading = false;

  constructor(

    private meetingService:
      MeetingService,

    private dialog:
      MatDialog,

    private snackBar:
      MatSnackBar,

    private router:
      Router,

    private cdr: 
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadMeetings();
  }

  /**
   * Chargement des rencontres
   */
  loadMeetings(): void {

    this.loading = true;

    this.meetingService

      .getMyMeetings()

      .subscribe({

        next: response => {

          this.meetings = response;

          this.filteredMeetings = response;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  /**
   * Filtre des rencontres
   * @param event 
   */
  applyFilter(
    event: Event
  ): void {

    const value =

      (event.target as HTMLInputElement)

        ?.value

        ?.toLowerCase() ?? '';

    this.filteredMeetings =

      this.meetings.filter(

        meeting =>

          meeting.title
            .toLowerCase()
            .includes(value)

          ||

          meeting.organizerName
            .toLowerCase()
            .includes(value)
      );
  }

  /**
   * Ouvre les details d'une rencontre
   * @param meeting 
   */
  openDetails(
    meeting: Meeting
  ): void {

    this.router.navigate([
      '/meetings',
      meeting.id
    ]);
  }

  /**
   * Ouvre le formulaire de création d'une rencontre
   */
  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        MeetingFormDialog,

        {
          width: '700px',
          maxWidth: '95vw'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadMeetings();
        }
      });
  }

  /**
   * Retourne le label du type de rencontre
   * @param type 
   * @returns 
   */
  getTypeLabel(
    type: string
  ): string {

    switch (type) {

      case 'TUTORAT':
        return 'Tutorat';

      case 'PREPARATION_COURS':
        return 'Préparation cours';

      case 'PREPARATION_EVALUATION':
        return 'Préparation évaluation';

      default:
        return type;
    }
  }

  /**
   * Ouvre le formulaire de modification d'une rencontre
   * @param meeting 
   */
  openEditDialog(
    meeting: Meeting
  ): void {

    const dialogRef =

    this.dialog.open(

      MeetingFormDialog,

      {

        width: '800px',

        maxWidth: '95vw',

        data: meeting
      }
    );

  dialogRef.afterClosed()

    .subscribe(result => {

      if (result) {

        this.loadMeetings();
      }
    });
}

/**
 * Supprime une rencontre
 * @param meeting 
 */
  deleteMeeting(
    meeting: Meeting
  ): void {

    const dialogRef =

      this.dialog.open(

        ConfirmDialog,

        {

          width: '450px',

          data: {

            title: 'Suppression',

            message:

              `Supprimer la réunion "${meeting.title}" ?`,

            confirmText: 'Supprimer',

            cancelText: 'Annuler'
          }
        }
      );

    dialogRef.afterClosed()

      .subscribe(

        confirmed => {

          if (!confirmed) {

            return;
          }

          this.meetingService

            .delete(
              meeting.id
            )

            .subscribe({

              next: () => {

                this.snackBar.open(

                  'Réunion supprimée',

                  'Fermer',

                  {
                    duration: 3000
                  }
                );

                this.loadMeetings();
              },

              error: error => {

                console.error(error);
              }
            });
        }
      );
  }
}
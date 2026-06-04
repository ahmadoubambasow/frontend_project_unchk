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

import {
  StudentGroup
} from '../../models/student-group.model';

import {
  StudentGroupService
} from '../../services/student-group';

import {
  StudentGroupFormDialog
} from './student-group-form-dialog/student-group-form-dialog';

import {
  ConfirmDialog
} from '../../shared/dialogs/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-student-groups',

  standalone: true,

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],

  templateUrl: './student-groups.html',

  styleUrl: './student-groups.scss'
})
export class StudentGroups
implements OnInit {

  groups: StudentGroup[] = [];

  filteredGroups: StudentGroup[] = [];

  loading = false;

  constructor(

    private groupService:
      StudentGroupService,

    private dialog:
      MatDialog,

    private snackBar:
      MatSnackBar,

    private router:
      Router,

    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadGroups();
  }

  loadGroups(): void {

    this.loading = true;

    this.groupService

      .getGroups()

      .subscribe({

        next: response => {

          this.groups =
            response;

          this.filteredGroups =
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

  applyFilter(
  event: Event
): void {

  const input =

    event.target as HTMLInputElement;

  const value =

    input?.value
      ?.toLowerCase()
      ?.trim() || '';

  this.filteredGroups =

    this.groups.filter(

      group =>

        group.name
          ?.toLowerCase()
          ?.includes(value)

        ||

        group.promotion
          ?.toLowerCase()
          ?.includes(value)

        ||

        group.formationName
          ?.toLowerCase()
          ?.includes(value)
    );
}

  openDetails(
    group: StudentGroup
  ): void {

    this.router.navigate([
      '/student-groups',
      group.id
    ]);
  }

  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        StudentGroupFormDialog,

        {

          width: '700px',

          maxWidth: '95vw'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadGroups();
        }
      });
  }

  openEditDialog(
    group: StudentGroup
  ): void {

    const dialogRef =

      this.dialog.open(

        StudentGroupFormDialog,

        {

          width: '700px',

          maxWidth: '95vw',

          data: group
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadGroups();
        }
      });
  }

  deleteGroup(
    group: StudentGroup
  ): void {

    const dialogRef =

      this.dialog.open(

        ConfirmDialog,

        {

          width: '450px',

          data: {

            title: 'Suppression',

            message:

              `Supprimer le groupe "${group.name}" ?`,

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

          this.groupService

            .delete(
              group.id
            )

            .subscribe({

              next: () => {

                this.snackBar.open(

                  'Groupe supprimé',

                  'Fermer',

                  {
                    duration: 3000
                  }
                );

                this.loadGroups();
              }
            });
        }
      );
  }
}
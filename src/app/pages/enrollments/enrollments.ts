import { CommonModule }
from '@angular/common';

import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatPaginator,
  MatPaginatorModule
} from '@angular/material/paginator';

import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';

import {
  MatSnackBar
} from '@angular/material/snack-bar';

import { EnrollmentService }
from '../../services/enrollment';

import { Enrollment }
from '../../models/enrollment.model';

import {
  EnrollmentFormDialog
} from './enrollment-form-dialog/enrollment-form-dialog';

/**
 * Page inscriptions.
 */
@Component({
  selector: 'app-enrollments',

  standalone: true,

  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],

  templateUrl: './enrollments.html',

  styleUrl: './enrollments.scss',
})
export class Enrollments
implements OnInit {

  /**
   * Data source table.
   */
  dataSource =
    new MatTableDataSource<Enrollment>();

  /**
   * Paginator.
   */
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  /**
   * Colonnes table.
   */
  displayedColumns = [

    'student',

    'formation',

    'academicYear',

    'status',

    'actions'
  ];

  constructor(

    private enrollmentService:
      EnrollmentService,

    private dialog: MatDialog,

    private snackBar: MatSnackBar

  ) {}

  /**
   * Initialisation composant.
   */
  ngOnInit(): void {

    this.loadEnrollments();
  }

  /**
   * Chargement inscriptions.
   */
  loadEnrollments(): void {

    this.enrollmentService

      .getEnrollments()

      .subscribe({

        next: (response) => {

          console.log(response);

          this.dataSource.data =
            response;

          this.dataSource.paginator =
            this.paginator;
        },

        error: (error) => {

          console.error(error);
        }
      });
  }

  /**
   * Filtre inscriptions.
   */
  applyFilter(event: Event): void {

    const filterValue =

      (event.target as HTMLInputElement)

        .value;

    this.dataSource.filter =

      filterValue

        .trim()

        .toLowerCase();
  }

  /**
   * Ouvre dialog création.
   */
  openCreateDialog(): void {

    const dialogRef =
      this.dialog.open(

        EnrollmentFormDialog,

        {
          width: '550px',
          height: '90%'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadEnrollments();
        }
      });
  }

  /**
   * Ouvre dialog modification.
   */
  openEditDialog(
    enrollment: Enrollment
  ): void {

    const dialogRef =
      this.dialog.open(

        EnrollmentFormDialog,

        {
          width: '550px',
          height: '90%',

          data: enrollment
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadEnrollments();
        }
      });
  }

  /**
   * Suppression inscription.
   */
  deleteEnrollment(
    enrollment: Enrollment
  ): void {

    const confirmed = confirm(

      `Supprimer cette inscription ?`
    );

    if (!confirmed) {

      return;
    }

    this.enrollmentService

      .deleteEnrollment(enrollment.id)

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Inscription supprimée',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.loadEnrollments();
        },

        error: (error) => {

          console.error(error);

          this.snackBar.open(

            'Erreur suppression',

            'Fermer',

            {
              duration: 3000
            }
          );
        }
      });
  }
}
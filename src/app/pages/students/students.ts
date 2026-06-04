import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import {
  MatSnackBar,
  MatSnackBarModule
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

import { Student } from '../../models/student.model';

import { StudentService } from '../../services/student';

import { StudentFormDialog } from './student-form-dialog/student-form-dialog';

import { ConfirmDialog } from '../../shared/dialogs/confirm-dialog/confirm-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',

  standalone: true,

  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],

  templateUrl: './students.html',

  styleUrl: './students.scss'
})
export class Students implements OnInit {

  /**
   * Liste complète
   */
  students: Student[] = [];

  /**
   * Liste filtrée
   */
  filteredStudents: Student[] = [];

  /**
   * Loading
   */
  loading = false;

  /**
   * Statistiques
   */
  totalStudents = 0;

  constructor(

    private studentService: StudentService,

    private dialog: MatDialog,

    private snackBar: MatSnackBar,

    private cdr: ChangeDetectorRef,

    private router: Router

  ) {}

  ngOnInit(): void {

    this.loadStudents();
  }

  /**
   * Chargement étudiants
   */
  loadStudents(): void {

    this.loading = true;

    this.studentService

      .getStudents()

      .subscribe({

        next: (response) => {

          console.log(response);

          this.students = response;

          this.filteredStudents = response;

          this.totalStudents = response.length;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(error);

          this.loading = false;

          this.snackBar.open(

            'Erreur lors du chargement',

            'Fermer',

            {
              duration: 3000
            }
          );
        }
      });
  }

  /**
   * Filtre
   */
  applyFilter(
    event: Event
  ): void {

    const value =

      (
        event.target as HTMLInputElement
      )

      .value

      .toLowerCase()

      .trim();

    this.filteredStudents =

      this.students.filter(

        student =>

          student.firstName
            ?.toLowerCase()
            .includes(value)

          ||

          student.lastName
            ?.toLowerCase()
            .includes(value)

          ||

          student.ine
            ?.toLowerCase()
            .includes(value)

          ||

          student.formationName
            ?.toLowerCase()
            .includes(value)

          ||

          student.promotion
            ?.toLowerCase()
            .includes(value)
      );
  }

  /**
   * Création
   */
  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        StudentFormDialog,

        {

          width: '800px',

          maxWidth: '95vw'
        }
      );

    dialogRef

      .afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadStudents();
        }
      });
  }

  /**
   * Modification
   */
  openEditDialog(
    student: Student
  ): void {

    const dialogRef =

      this.dialog.open(

        StudentFormDialog,

        {

          width: '900px',
          maxWidth: '95vw',
          maxHeight: '90vh',

          data: student
        }
      );

    dialogRef

      .afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadStudents();
        }
      });
  }

  /**
   * Détail
   */
  openDetails(
    student: Student
  ): void {

    console.log(
      'Détail étudiant',
      student
    );

    this.router.navigate([
      '/students',
      student.id
    ])
  }

  /**
   * Suppression
   */
  deleteStudent(
    student: Student
  ): void {

    const dialogRef =

      this.dialog.open(

        ConfirmDialog,

        {

          width: '450px',

          data: {

            title: 'Suppression',

            message:

              `Supprimer l'étudiant "${student.firstName} ${student.lastName}" ?`,

            confirmText: 'Supprimer',

            cancelText: 'Annuler'
          }
        }
      );

    dialogRef

      .afterClosed()

      .subscribe(

        confirmed => {

          if (!confirmed) {

            return;
          }

          this.studentService

            .delete(
              student.id
            )

            .subscribe({

              next: () => {

                this.snackBar.open(

                  'Étudiant supprimé',

                  'Fermer',

                  {
                    duration: 3000
                  }
                );

                this.loadStudents();
              },

              error: (error) => {

                console.error(error);

                this.snackBar.open(

                  'Erreur lors de la suppression',

                  'Fermer',

                  {
                    duration: 3000
                  }
                );
              }
            });
        }
      );
  }

  /**
   * Répartition H/F
   * Préparation dashboard futur
   */
  getMaleCount(): number {

    return 0;
  }

  getFemaleCount(): number {

    return 0;
  }
}
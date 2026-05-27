import { CommonModule }
from '@angular/common';

import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatSelectModule
} from '@angular/material/select';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { forkJoin } from 'rxjs';

import { EnrollmentService }
from '../../../services/enrollment';

import { StudentService }
from '../../../services/student';

import { FormationService }
from '../../../services/formation';

import { Student }
from '../../../models/student.model';

import { Formation }
from '../../../models/formation.model';

import { Enrollment }
from '../../../models/enrollment.model';

/**
 * Dialog création / modification inscription.
 */
@Component({
  selector: 'app-enrollment-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ],

  templateUrl:
    './enrollment-form-dialog.html',

  styleUrl:
    './enrollment-form-dialog.scss',
})
export class EnrollmentFormDialog
implements OnInit {

  /**
   * Loading state.
   */
  loading = false;

  /**
   * Chargement données.
   */
  dataLoaded = false;

  /**
   * Formulaire inscription.
   */
  enrollmentForm!: FormGroup;

  /**
   * Liste étudiants.
   */
  students: Student[] = [];

  /**
   * Liste formations.
   */
  formations: Formation[] = [];

  constructor(

    private fb: FormBuilder,

    private enrollmentService:
      EnrollmentService,

    private studentService:
      StudentService,

    private formationService:
      FormationService,

    private snackBar: MatSnackBar,

    public dialogRef:
      MatDialogRef<EnrollmentFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data: Enrollment | null

  ) {

    /**
     * Initialisation formulaire.
     */
    this.enrollmentForm = this.fb.group({

      studentId: [
        null,
        Validators.required
      ],

      formationId: [
        null,
        Validators.required
      ],

      academicYear: [
        '',
        Validators.required
      ]
    });
  }

  /**
   * Initialisation composant.
   */
  ngOnInit(): void {

    forkJoin({

      students:
        this.studentService.getStudents(),

      formations:
        this.formationService.getFormations()

    }).subscribe({

      next: (response) => {

        this.students =
          response.students;

        this.formations =
          response.formations;

        /**
         * Mode édition.
         */
        if (this.data) {

          const student =
            this.students.find(

              s =>

                `${s.firstName} ${s.lastName}`

                ===

                this.data?.studentName
            );

          const formation =
            this.formations.find(

              f =>

                f.name

                ===

                this.data?.formationName
            );

          this.enrollmentForm.patchValue({

            studentId:
              student?.id,

            formationId:
              formation?.id,

            academicYear:
              this.data.academicYear
          });
        }

        setTimeout(() => {

          this.dataLoaded = true;

        });
      },

      error: (error) => {

        console.error(error);

        setTimeout(() => {

          this.dataLoaded = true;

        });
      }
    });
  }

  /**
   * Soumission formulaire.
   */
  submit(): void {

    console.log(
      this.enrollmentForm.value
    );

    // Validation formulaire
    if (this.enrollmentForm.invalid) {

      return;
    }

    this.loading = true;

    /**
     * MODE UPDATE
     */
    if (this.data) {

      this.enrollmentService

        .updateEnrollment(

          this.data.id,

          this.enrollmentForm.value

        )

        .subscribe({

          next: () => {

            setTimeout(() => {

              this.loading = false;

              this.snackBar.open(

                'Inscription modifiée avec succès',

                'Fermer',

                {
                  duration: 3000
                }
              );

              this.dialogRef.close(true);

            });
          },

          error: (error) => {

            setTimeout(() => {

              this.loading = false;

              console.error(error);

              this.snackBar.open(

                'Une erreur est survenue',

                'Fermer',

                {
                  duration: 3000
                }
              );

            });
          }
        });

      return;
    }

    /**
     * MODE CREATE
     */
    this.enrollmentService

      .createEnrollment(

        this.enrollmentForm.value

      )

      .subscribe({

        next: () => {

          setTimeout(() => {

            this.loading = false;

            this.snackBar.open(

              'Inscription créée avec succès',

              'Fermer',

              {
                duration: 3000
              }
            );

            this.dialogRef.close(true);

          });
        },

        error: (error) => {

          setTimeout(() => {

            this.loading = false;

            console.error(error);

            this.snackBar.open(

              'Une erreur est survenue',

              'Fermer',

              {
                duration: 3000
              }
            );

          });
        }
      });
  }
}
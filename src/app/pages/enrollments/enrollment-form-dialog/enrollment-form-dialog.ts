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

import { PromotionService } from '../../../services/promotion';

import { StudentGroupService } from '../../../services/student-group';

import { Promotion } from '../../../models/promotion.model';

import {StudentGroup } from '../../../models/student-group.model';

import { Student }
from '../../../models/student.model';

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
   *  Promotion.
   */
  promotions: Promotion[] = [];

  /**
   * Groupe
   */
  groups: StudentGroup[] = [];
  

  constructor(

    private fb: FormBuilder,

    private enrollmentService:
      EnrollmentService,

    private studentService:
      StudentService,

    private promotionService: PromotionService,

    private studentGroupService: StudentGroupService,

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

      promotionId: [
        null,
        Validators.required
      ],

      groupId: [
        null,
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

      promotions:
        this.promotionService.getPromotions()

    }).subscribe({

      next: (response) => {

        this.students =
          response.students;

        this.promotions =
          response.promotions;

        /**
         * Mode édition.
         */
        if (this.data) {

          this.onPromotionChange(
            this.data.promotionId
          );

          this.enrollmentForm.patchValue({

            studentId:
              this.data.studentId,

            promotionId:
              this.data.promotionId
          });

          setTimeout(() => {

            this.enrollmentForm.patchValue({

              groupId:
                this.data?.groupId
            });

          }, 300);
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
   * Chargement des groupes selon la promotion
   */
  onPromotionChange(promotionId: number): void {

    if (!promotionId) {

      this.groups = [];

      this.enrollmentForm.patchValue({ groupId: null });

      return;
    }

    this.studentGroupService.getGroupsByPromotion(promotionId).subscribe({

      next: (response) => {

        this.groups = response;
      }, 

      error: (error) => {

        console.error(error);
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
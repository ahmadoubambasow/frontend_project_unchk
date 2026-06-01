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

import { FormationService }
from '../../../services/formation';

import { StudentService }
from '../../../services/student';

import { PromotionService } from '../../../services/promotion';

import { StudentGroupService } from '../../../services/student-group';

import { Promotion } from '../../../models/promotion.model';

import { Formation } from '../../../models/formation.model';

import {StudentGroup } from '../../../models/student-group.model';

import { Student }
from '../../../models/student.model';

import { Enrollment }
from '../../../models/enrollment.model';
import { Filiere } from '../../../models/filiere.model';
import { FiliereService } from '../../../services/filiere';

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
   * Filières
   */
  filieres: Filiere[] = [];

  /**
   * Formation.
   */
  formations: Formation[] = [];
   

  /**
   * Groupe
   */
  groups: StudentGroup[] = [];
  

  constructor(

    private fb: FormBuilder,

    private enrollmentService:
      EnrollmentService,

    private filiereService: FiliereService,

    private studentService:
      StudentService,

    private formationService:
      FormationService,

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

      filiereId: [
        null,
        Validators.required
      ],

      formationId: [
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
        this.promotionService.getPromotions(),

      formations:
        this.formationService.getFormations(),

      filieres:
        this.filiereService.getFilieres(),

    }).subscribe({

      next: (response) => {

        this.students =
          response.students;

        this.promotions =
          response.promotions;

        this.formations =
          response.formations;

        this.filieres =
          response.filieres;

        /**
         * Mode édition.
         */
        if (this.data) {

          this.onFormationChange(
            this.data.formationId
          );

          this.enrollmentForm.patchValue({

            studentId:
              this.data.studentId,

            promotionId:
              this.data.promotionId,

            filiereId:
              this.data.filiereId,

            formationId:
              this.data.formationId
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

  onFiliereChange(filiereId: number): void {

    this.enrollmentForm.patchValue({

      formationId: null,

      groupId: null
    });

    this.groups = [];

    this.formations = [];

    this.formationService.getFormationsByFiliere(filiereId).subscribe({

      next: (response) => {

        this.formations = response;
      }
    });
  }

  /**
   * Chargement des groupes selon la formation.
   */
  onFormationChange(
  formationId: number
): void {

 
    this.enrollmentForm.patchValue({

      groupId: null
    });


  this.studentGroupService

    .getGroupsByFormation(
      formationId
    )

    .subscribe({

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
import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
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
  MatSnackBar
} from '@angular/material/snack-bar';

import { Formation } from '../../../models/formation.model';

import { StudentGroup } from '../../../models/student-group.model';

import { FormationService } from '../../../services/formation';

import { StudentGroupService } from '../../../services/student-group';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-group-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],

  templateUrl:
    './student-group-form-dialog.html',

  styleUrl:
    './student-group-form-dialog.scss'
})
export class StudentGroupFormDialog
implements OnInit {

  form!: FormGroup;

  loading = false;

  formations: Formation[] = [];

  constructor(

    private fb: FormBuilder,

    private formationService:
      FormationService,

    private studentGroupService:
      StudentGroupService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<StudentGroupFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data?: StudentGroup

  ) {}

  ngOnInit(): void {

    this.buildForm();

    this.loadFormations();

    if (this.data) {

      this.patchForm();
    }
  }

  /**
   * Construction formulaire
   */
  buildForm(): void {

    this.form = this.fb.group({

      name: [

        '',

        Validators.required
      ],

      promotion: [

        '',

        Validators.required
      ],

      academicYear: [

        new Date().getFullYear(),

        Validators.required
      ],

      formationId: [

        '',

        Validators.required
      ]
    });
  }

  /**
   * Chargement formations
   */
  loadFormations(): void {

    this.formationService

      .getFormations()

      .subscribe({

        next: response => {

          this.formations =
            response;
        },

        error: error => {

          console.error(error);
        }
      });
  }

  /**
   * Pré-remplissage édition
   */
  patchForm(): void {

    this.form.patchValue({

      name:
        this.data?.name,

      promotion:
        this.data?.promotion,

      academicYear:
        this.data?.academicYear,

      formationId:
        this.data?.formationId
    });
  }

  /**
   * Soumission
   */
  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    if (this.data?.id) {

      this.studentGroupService

        .update(

          this.data.id,

          this.form.value

        )

        .subscribe({

          next: () => {

            this.loading = false;

            this.snackBar.open(

              'Groupe modifié avec succès',

              'Fermer',

              {
                duration: 3000
              }
            );

            this.dialogRef.close(true);
          },

          error: error => {

            console.error(error);

            this.loading = false;

            this.snackBar.open(

              'Erreur lors de la modification',

              'Fermer',

              {
                duration: 3000
              }
            );
          }
        });

      return;
    }

    this.studentGroupService

      .create(
        this.form.value
      )

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(

            'Groupe créé avec succès',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.dialogRef.close(true);
        },

        error: error => {

          console.error(error);

          this.loading = false;

          this.snackBar.open(

            'Erreur lors de la création',

            'Fermer',

            {
              duration: 3000
            }
          );
        }
      });
  }

  /**
   * Fermeture
   */
  close(): void {

    this.dialogRef.close();
  }
}
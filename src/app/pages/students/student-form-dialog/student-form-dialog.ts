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

import { Student } from '../../../models/student.model';

import { StudentService } from '../../../services/student';

import { Formation } from '../../../models/formation.model';

import { FormationService } from '../../../services/formation';

@Component({
  selector: 'app-student-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],

  templateUrl:
    './student-form-dialog.html',

  styleUrl:
    './student-form-dialog.scss'
})
export class StudentFormDialog
implements OnInit {

  form!: FormGroup;

  loading = false;

  formations: Formation[] = [];

  constructor(

    private fb: FormBuilder,

    private studentService:
      StudentService,

    private formationService:
      FormationService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<StudentFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data?: Student

  ) {}

  ngOnInit(): void {

    this.buildForm();

    this.loadFormations();

    if (this.data) {

      this.patchForm();
    }
  }

  buildForm(): void {

    this.form = this.fb.group({

      firstName: [
        '',
        Validators.required
      ],

      lastName: [
        '',
        Validators.required
      ],

      birthDate: [
        '',
        Validators.required
      ],

      promotion: [
        '',
        Validators.required
      ],

      startYear: [
        new Date().getFullYear(),
        Validators.required
      ],

      graduationYear: [
        '',
        Validators.required
      ],

      diplomas: [''],

      otherTrainings: [''],

      formationId: [
        '',
        Validators.required
      ]
    });
  }

  loadFormations(): void {

    this.formationService

      .getFormations()

      .subscribe({

        next: response => {

          this.formations =
            response;
        },

        error: console.error
      });
  }

  patchForm(): void {

    this.form.patchValue({

      firstName:
        this.data?.firstName,

      lastName:
        this.data?.lastName,

      birthDate:
        this.data?.birthDate,

      promotion:
        this.data?.promotion,

      startYear:
        this.data?.startYear,

      graduationYear:
        this.data?.graduationYear,

      diplomas:
        this.data?.diplomas,

      otherTrainings:
        this.data?.otherTrainings,

      formationId:
        this.data?.formationId
    });
  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    if (this.data) {

      this.studentService

        .update(
          this.data.id,
          this.form.value
        )

        .subscribe({

          next: () => {

            this.loading = false;

            this.snackBar.open(

              'Étudiant modifié',

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
          }
        });

      return;
    }

    this.studentService

      .create(
        this.form.value
      )

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(

            'Étudiant créé',

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
        }
      });
  }
}
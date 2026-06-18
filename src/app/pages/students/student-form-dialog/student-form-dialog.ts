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
import { Formation } from '../../../models/formation.model';
import { StudentGroup } from '../../../models/student-group.model';

import { StudentService } from '../../../services/student';
import { FormationService } from '../../../services/formation';
import { StudentGroupService } from '../../../services/student-group';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-form-dialog',

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
    './student-form-dialog.html',

  styleUrl:
    './student-form-dialog.scss'
})
export class StudentFormDialog implements OnInit {

  /**
   * Formulaire
   */
  form!: FormGroup;

  /**
   * Chargement
   */
  loading = false;

  /**
   * Formations
   */
  formations: Formation[] = [];

  /**
   * Groupes
   */
  groups: StudentGroup[] = [];

  constructor(

    private fb: 
      FormBuilder,

    private studentService:
      StudentService,

    private formationService:
      FormationService,

    private studentGroupService:
      StudentGroupService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<StudentFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data?: Student

  ) {}

  ngOnInit(): void {

    // Build form
    this.buildForm();

    // Load users
    this.loadFormations();

    // Load groups
    this.loadGroups();

    // Patch form
    if (this.data) {

      this.patchForm();
    }
  }

  // Build form
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

      formationId: [
        '',
        Validators.required
      ],

      groupId: [
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

      otherTrainings: ['']
    });
  }

  /**
   * Chargement des formations
   */
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

  /**
   * Chargement des groupes
   */
  loadGroups(): void {

    this.studentGroupService

      .getGroups()

      .subscribe({

        next: response => {

          this.groups =
            response;
        },

        error: console.error
      });
  }

  /**
   * Patch form
   */
  patchForm(): void {

    this.form.patchValue({

      firstName:
        this.data?.firstName,

      lastName:
        this.data?.lastName,

      birthDate:
        this.data?.birthDate,

      formationId:
        this.data?.formationId,

      groupId:
        this.data?.groupId,

      startYear:
        this.data?.startYear,

      graduationYear:
        this.data?.graduationYear,

      diplomas:
        this.data?.diplomas,

      otherTrainings:
        this.data?.otherTrainings
    });
  }

  /**
   * Soumission
   */
  submit(): void {

    // Vérification formulaire
    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    // Mise à jour
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

    // Création
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
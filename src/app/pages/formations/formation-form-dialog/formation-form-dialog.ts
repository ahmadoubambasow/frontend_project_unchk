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
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import {
  Formation
} from '../../../models/formation.model';

import {
  FormationService
} from '../../../services/formation';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-formation-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule
  ],

  templateUrl:
    './formation-form-dialog.html',

  styleUrl:
    './formation-form-dialog.scss'
})
export class FormationFormDialog
implements OnInit {

  /**
   * Formulaire
   */
  form!: FormGroup;

  /**
   * Loading
   */
  loading = false;

  /**
   * Types de formation
   */
  formationTypes = [

    'CERTIFIANTE',

    'DIPLOMANTE',

    'CONTINUE',

    'PRIVEE'
  ];

  /**
   * Niveaux
   */
  formationLevels = [

    'LICENCE',

    'MASTER',

    'DOCTORAT',

    'CERTIFICAT'
  ];

  /**
   * Types de financement
   */
  fundingTypes = [

    'ETAT',

    'PRIVE',

    'PARTENAIRE',

    'AUTOFINANCEMENT'
  ];

  constructor(

    private fb: FormBuilder,

    private formationService:
      FormationService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<FormationFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data:
      Formation | null

  ) {}

  ngOnInit(): void {

    this.initForm();

    if (this.data) {

      this.patchForm();
    }
  }

  /**
   * Initialisation formulaire
   */
  initForm(): void {

    this.form = this.fb.group({

      name: [

        '',

        Validators.required
      ],

      formationType: [

        '',

        Validators.required
      ],

      level: [

        '',

        Validators.required
      ],

      startDate: [

        '',

        Validators.required
      ],

      endDate: [

        '',

        Validators.required
      ],

      fundingAmount: [

        0
      ],

      fundingType: [

        ''
      ],

      maleCount: [

        0
      ],

      femaleCount: [

        0
      ],

      description: [

        ''
      ]
    });
  }

  /**
   * Pré-remplissage édition
   */
  patchForm(): void {

    this.form.patchValue({

      name:
        this.data?.name,

      formationType:
        this.data?.formationType,

      level:
        this.data?.level,

      startDate:
        this.data?.startDate,

      endDate:
        this.data?.endDate,

      fundingAmount:
        this.data?.fundingAmount,

      fundingType:
        this.data?.fundingType,

      maleCount:
        this.data?.maleCount,

      femaleCount:
        this.data?.femaleCount,

      description:
        this.data?.description
    });
  }

  /**
   * Création / Modification
   */
  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    const payload =

      this.form.value;

    /**
     * Modification
     */
    if (this.data) {

      this.formationService

        .updateFormation(
          this.data.id,
          payload
        )

        .subscribe({

          next: (response) => {

            this.loading = false;

            this.snackBar.open(

              'Formation modifiée avec succès',

              'Fermer',

              {
                duration: 3000
              }
            );

            this.dialogRef.close(
              response
            );
          },

          error: (error) => {

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

    /**
     * Création
     */
    this.formationService

      .createFormation(
        payload
      )

      .subscribe({

        next: (response) => {

          this.loading = false;

          this.snackBar.open(

            'Formation créée avec succès',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.dialogRef.close(
            response
          );
        },

        error: (error) => {

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
}
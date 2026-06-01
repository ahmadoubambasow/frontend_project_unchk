import { CommonModule } from '@angular/common';
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

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Formation } from '../../../models/formation.model';
import { Filiere } from '../../../models/filiere.model';

import { FormationService } from '../../../services/formation';
import { FiliereService } from '../../../services/filiere';

@Component({
  selector: 'app-formation-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],

  templateUrl: './formation-form-dialog.html',

  styleUrl: './formation-form-dialog.scss'
})
export class FormationFormDialog
implements OnInit {

  /**
   * Loading
   */
  loading = false;

  /**
   * Liste des filières
   */
  filieres: Filiere[] = [];

  /**
   * Formulaire
   */
  formationForm!: FormGroup;

  constructor(

    private fb: FormBuilder,

    private formationService:
      FormationService,

    private filiereService:
      FiliereService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<FormationFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data:
      Formation | null

  ) {

    this.formationForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      description: [''],

      duration: [
        null,
        Validators.required
      ],

      filiereId: [
        null,
        Validators.required
      ]
    });
  }

  ngOnInit(): void {

    this.loadFilieres();
  }

  /**
   * Chargement des filières
   */
  loadFilieres(): void {

    this.filiereService

      .getFilieres()

      .subscribe({

        next: (response) => {

          this.filieres = response;

          if (this.data) {

            this.formationForm.patchValue({

              name:
                this.data.name,

              description:
                this.data.description,

              duration:
                this.data.duration,

              filiereId:
                this.data.filiereId
            });
          }
        },

        error: (error) => {

          console.error(error);

          this.snackBar.open(

            'Erreur chargement des filières',

            'Fermer',

            {
              duration: 3000
            }
          );
        }
      });
  }

  /**
   * Soumission
   */
  submit(): void {

    if (
      this.formationForm.invalid
    ) {

      return;
    }

    this.loading = true;

    if (this.data) {

      this.updateFormation();

      return;
    }

    this.createFormation();
  }

  /**
   * Création
   */
  createFormation(): void {

    console.log(this.formationForm.value);
    this.formationService

      .createFormation(
        this.formationForm.value
      )

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(

            'Formation créée avec succès',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.dialogRef.close(
            true
          );
        },

        error: (error) => {

          this.loading = false;

          console.error(error);

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
   * Modification
   */
  updateFormation(): void {

    this.formationService

      .updateFormation(

        this.data!.id,

        this.formationForm.value
      )

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(

            'Formation modifiée avec succès',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.dialogRef.close(
            true
          );
        },

        error: (error) => {

          this.loading = false;

          console.error(error);

          this.snackBar.open(

            'Erreur lors de la modification',

            'Fermer',

            {
              duration: 3000
            }
          );
        }
      });
  }
}
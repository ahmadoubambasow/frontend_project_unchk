import { CommonModule } from '@angular/common';

import {
  Component,
  Inject
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
  MatSnackBar
} from '@angular/material/snack-bar';

import { Filiere }
from '../../../models/filiere.model';

import { FiliereService }
from '../../../services/filiere';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filiere-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl:
    './filiere-form-dialog.html',

  styleUrl:
    './filiere-form-dialog.scss'
})
export class FiliereFormDialog {

  /**
   * Loading
   */
  loading = false;

  /**
   * Formulaire
   */
  filiereForm!: FormGroup;

  constructor(

    private fb: FormBuilder,

    private filiereService:
      FiliereService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<FiliereFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data:
      Filiere | null

  ) {

    this.filiereForm =

      this.fb.group({

        name: [
          '',
          Validators.required
        ],

        description: ['']
      });

    /**
     * Edition
     */
    if (this.data) {

      this.filiereForm.patchValue({

        name:
          this.data.name,

        description:
          this.data.description
      });
    }
  }

  /**
   * Soumission
   */
  submit(): void {

    if (
      this.filiereForm.invalid
    ) {

      return;
    }

    this.loading = true;

    if (this.data) {

      this.updateFiliere();

      return;
    }

    this.createFiliere();
  }

  /**
   * Création
   */
  createFiliere(): void {

    this.filiereService

      .createFiliere(
        this.filiereForm.value
      )

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(

            'Filière créée',

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

          console.error(
            error
          );
        }
      });
  }

  /**
   * Modification
   */
  updateFiliere(): void {

    this.filiereService

      .updateFiliere(

        this.data!.id,

        this.filiereForm.value
      )

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(

            'Filière modifiée',

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

          console.error(
            error
          );
        }
      });
  }
}
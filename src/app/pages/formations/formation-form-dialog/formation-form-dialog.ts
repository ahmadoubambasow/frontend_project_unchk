import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormationService } from '../../../services/formation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Formation } from '../../../models/formation.model';

@Component({
  selector: 'app-formation-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './formation-form-dialog.html',
  styleUrl: './formation-form-dialog.scss',
})
export class FormationFormDialog {

  /**
   * Loading state
   */
  loading = false;

  /**
   * Formulaire
   */
  formationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,

    private formationService: FormationService,

    private snackBar: MatSnackBar,

    public dialogRef: MatDialogRef<FormationFormDialog>,

    @Inject(MAT_DIALOG_DATA)
    public data: Formation | null
  ) {

    // Formulaire
    this.formationForm = this.fb.group({
      
      name: [
        '', Validators.required
      ],
      description: [''],
      duration: [0]
    });

    /**
     * Mode édition
     */
    if (this.data) {
      this.formationForm.patchValue({
        name: this.data.name,
        description: this.data.description,
        duration: this.data.duration
      });
    }
  }

  /**
   * Soumission formulaire
   */
  submit(): void {

    if (this.formationForm.invalid) {

      return;
    }

    this.loading = true;

    /**
     * Mode Update
     */
    if (this.data) {
      this.formationService.updateFormation(this.data.id, this.formationForm.value).subscribe({

        next: () => {
          this.loading = false;

          this.snackBar.open(
            'Formation modifiée',
            'Fermer',
            {
              duration: 3000
            }
          );
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        }
      });
      return;
    }

    /**
     * Mode Create
     */
    this.formationService.createFormation(this.formationForm.value).subscribe({
      
      next: () => {
        this.loading = false;

        this.snackBar.open(
          'Formation créée',
          'Fermer',
          {
            duration: 3000
          }
        );
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      }
    })
  }
}

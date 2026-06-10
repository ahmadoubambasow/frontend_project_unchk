import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Formation } from '../../../models/formation.model';
import { FormationService } from '../../../services/formation';
import { PromotionService } from '../../../services/promotion';
import { Promotion } from '../../../models/promotion.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-promotion-form-dialog',
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './promotion-form-dialog.html',
  styleUrl: './promotion-form-dialog.scss',
})
export class PromotionFormDialog implements OnInit {

  /**
   * Loading
   */
  loading = false;

  /**
   * Form
   */
  promotionForm!: FormGroup;

  /**
   * Formation
   */
  formations: Formation[] = [];

  constructor(
    private fb: FormBuilder,

    private formationService: FormationService,

    private promotionService: PromotionService,

    private snackBar: MatSnackBar,

    public dialogRef: MatDialogRef<PromotionFormDialog>,

    @Inject(MAT_DIALOG_DATA) public data: Promotion | null

  ) {

    this.promotionForm =

      this.fb.group({

        name: [

          '',

          Validators.required
        ],

        academicYear: [

          '',

          Validators.required
        ],

        capacity: [

          null,

          Validators.required
        ],

        /*formationId: [

          null,

          Validators.required
        ] */
      }
    );    
  }

  ngOnInit(): void {

    this.loadFormations();

    if (this.data) {

      this.promotionForm.patchValue({

        name: this.data.name,

        academicYear: this.data.academicYear,

        capacity: this.data.capacity,

        //formationId: this.data.formationId
      });
    }
  }

  /**
   * Load formations
   */
  loadFormations(): void {

    this.formationService.getFormations().subscribe({

      next: (response) => {

        this.formations = response;
      },
      error: (error) => {

        console.error(error);
      }
    });
  }

  /**
   * Submit
   */
  submit(): void {

    if (this.promotionForm.invalid) {

      return;
    }

    this.loading = true;

    if (this.data) {
      
      this.updatePromotion();
    }
    else {
      
      this.createPromotion();
    }
  }

  /**
   * Create promotion
   */
  createPromotion(): void {

    this.promotionService.createPromotion(this.promotionForm.value).subscribe({
   
      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Promotion crée avec succès',
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

        this.snackBar.open(
          'Une erreur est survenue',
          'Fermer',
          {
            duration: 3000
          }
        );
      }
    });
  }

  /**
   * Update promotion
   */
  updatePromotion(): void {

    this.promotionService.updatePromotion(this.data!.id, this.promotionForm.value).subscribe({

      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Promotion modifiée avec succès',
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

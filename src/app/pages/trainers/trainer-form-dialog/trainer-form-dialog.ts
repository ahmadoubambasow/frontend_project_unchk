import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Formation } from '../../../models/formation.model';
import { TrainerService } from '../../../services/trainer';
import { FormationService } from '../../../services/formation';
import { Trainer } from '../../../models/trainer.model';

@Component({
  selector: 'app-trainer-form-dialog',
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
  templateUrl: './trainer-form-dialog.html',
  styleUrl: './trainer-form-dialog.scss',
})
export class TrainerFormDialog {

  /**
   * Loading
   */
  loading = false;

  /**
   * Formulaire
   */
  trainerForm!: FormGroup;

  /**
   * Formations
   */
  formations: Formation[] = [];

  /**
   * Types
   */
  trainerTypes = [

    'TEACHER',

    'ASSOCIATE_TEACHER',

    'TUTOR',

    'FORMATION_MANAGER'
  ];

  constructor(

    private fb: FormBuilder,

    private trainerService: TrainerService,

    private formationService: FormationService,

    private snackBar: MatSnackBar,

    public dialogRef: MatDialogRef<TrainerFormDialog>,

    @Inject(MAT_DIALOG_DATA) 
    
    public data: Trainer | null
  ) {

    this.trainerForm = this.fb.group({

      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      phone: [''],

      type: ['', Validators.required],

      speciality: [''],

      grade: [''],
      
    });
  }

  /**
   * Initialisation
   */
  ngOnInit(): void {

    this.loadFormations();
  }

  /**
   * Chargement formations
   */
  loadFormations(): void {

    this.formationService.getFormations().subscribe({

      next: (response) => {

        this.formations = response;

        if (this.data) {

          this.trainerForm.patchValue({

            firstName: this.data.firstName,
            
            lastName: this.data.lastName,
            
            email: this.data.email,
            
            phone: this.data.phone,
            
            type: this.data.type,
            
            speciality: this.data.speciality,
            
            grade: this.data.grade,
            
          });
        }
      },

      error: (error) => {

        console.error(error);
      }
    });
  }

  /**
   * Soumission
   */
  submit(): void {

    if (this.trainerForm.invalid) {
      
      return;
    }

    this.loading = true;

    /**
     * MODE UPDATE
     */
    if (this.data) {

      this.trainerService.updateTrainer(this.data.id, this.trainerForm.value)

        .subscribe({

          next: () => {

            this.loading = false;

            this.snackBar.open(
              'Formateur modifié avec succès', 
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

        return;
    }

    /**
     * MODE CREATE
     */
    this.trainerService.createTrainer(this.trainerForm.value).subscribe({

      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Formateur créé avec succès', 
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
}

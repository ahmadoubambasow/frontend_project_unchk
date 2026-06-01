import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Filiere } from '../../../models/filiere.model';
import { Formation } from '../../../models/formation.model';
import { Subject } from '../../../models/subject.model';
import { Trainer } from '../../../models/trainer.model';
import { FormationService } from '../../../services/formation';
import { FiliereService } from '../../../services/filiere';
import { SubjectService } from '../../../services/subject';
import { TrainerService } from '../../../services/trainer';
import { TrainerSubjectService } from '../../../services/trainer-subject';

@Component({
  selector: 'app-trainer-subjects-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './trainer-subjects-form-dialog.html',
  styleUrl: './trainer-subjects-form-dialog.scss',
})
export class TrainerSubjectsFormDialog implements OnInit {

  /**
   * Loading
   */
  loading = false;

  /**
   * Form
   */
  assignmentForm!: FormGroup;

  /**
   * Filières
   */
  filieres: Filiere[] = [];

  /**
   * Formations
   */
  formations: Formation[] = [];

  /**
   * Subject
   */
  subjects: Subject[] = [];

  /**
   * Encadreur, Tuteur, etc...
   */
  trainers: Trainer[] = [];

  constructor(

    private fb: FormBuilder,

    private filiereService: FiliereService,

    private formationService: FormationService,

    private subjectService: SubjectService,

    private trainerService: TrainerService,

    private trainerSubjectService: TrainerSubjectService,

    private snackBar: MatSnackBar,

    public dialogRef: MatDialogRef<TrainerSubjectsFormDialog>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.assignmentForm = this.fb.group({

      filiereId: [null, Validators.required],

      formationId: [null, Validators.required],

      subjectId: [null, Validators.required],

      trainerId: [null, Validators.required]
    });
  }

  ngOnInit(): void {

    this.loadFilieres();

    this.loadTrainers();
  }

  /**
   * Filières
   */
  loadFilieres(): void {

    this.filiereService.getFilieres().subscribe({

      next: (response) => {

        this.filieres = response;
      },

      error: (error) => {

        console.error(error);
      
      }
    });
  }

  /**
   * Enseignant
   */
  loadTrainers() {

    this.trainerService.getTrainers().subscribe({

      next: (response) => {

        this.trainers = response;
      },

      error: (error) => {

        console.error(error);
      }
    });
  }

  /**
   * Filières -> Formations
   */
  onFiliereChange(filiereId: number): void {

    this.formations = [];

    this.subjects = [];

    this.assignmentForm.patchValue({

      formationId: null,

      subjectId: null
    
    });

    this.formationService.getFormationsByFiliere(filiereId).subscribe({

      next: (response) => {

        this.formations = response;
      
      },

      error: (error) => {
        console.error(error);
      }
    });
  }

  /**
   * Formation -> Matières
   */
  onFormationChange(formationId: number): void {

    this.subjects = [];

    this.assignmentForm.patchValue({

      subjectId: null
    });

    this.subjectService.getSubjectByFormation(formationId).subscribe({

      next: (response) => {

        this.subjects = response;
      },

      error: (error) => {

        console.error(error);
      }
    });
  }

  /**
   * Affectation
   */
  submit(): void {

    if (this.assignmentForm.invalid) {
      
      return;
    }

    this.loading = true;

    const payload = {

      trainerId: this.assignmentForm.value.trainerId,

      subjectId: this.assignmentForm.value.subjectId,

    };

    this.trainerSubjectService.createAssignment(payload).subscribe({

      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Affectation crée avec succès',
          'Fermer',
          {
            duration: 3000
          }
        );

        this.dialogRef.close(true);
      
      },

      error: (error) => {

        console.error(error);
      
        this.loading = false;
      }
    });
  }
}

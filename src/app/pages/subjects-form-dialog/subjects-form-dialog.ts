import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Filiere } from '../../models/filiere.model';
import { Formation } from '../../models/formation.model';
import { FiliereService } from '../../services/filiere';
import { FormationService } from '../../services/formation';
import { SubjectService } from '../../services/subject';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from '../../models/subject.model';

@Component({
  selector: 'app-subjects-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './subjects-form-dialog.html',
  styleUrl: './subjects-form-dialog.scss',
})
export class SubjectsFormDialog implements OnInit {

  /**
   * Loading
   */
  loading = false;

  /**
   * Form
   */
  subjectForm!: FormGroup;

  /**
   * Filières
   */
  filieres: Filiere[] = [];

  /**
   * Formations
   */
  formations: Formation[] = [];

  constructor(

    private fb:FormBuilder,

    private filiereService: FiliereService,

    private formationService: FormationService,

    private subjectService: SubjectService,

    private snackBar: MatSnackBar,

    public dialogRef: MatDialogRef<SubjectsFormDialog>,

    @Inject(MAT_DIALOG_DATA) 
    public data: Subject | null
  ) {

    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      coefficient: [null, Validators.required],
      hours: [null, Validators.required],
      filiereId: ['', Validators.required],
      formationId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
    this.loadFilieres();
  }

  /**
   * Filières
   */
  loadFilieres(): void {

    this.filiereService.getFilieres().subscribe({

      next: (response) => {

        this.filieres = response;
      
        if (this.data) {

          this.subjectForm.patchValue({

            name: this.data.name,

            description: this.data.description,

            coefficient: this.data.coefficient,

            hours: this.data.hours,

            filiereId: this.data.filiereId
          });

          this.onFiliereChange(this.data.filiereId);
        }
      },

      error: (error) => {

        console.error(error);
      }
    });
  }

  /**
   * Changement filière
   */
  onFiliereChange(filiereId: number): void {

    this.formations = [];

    this.subjectForm.patchValue({

      formationId: null
    });

    this.formationService.getFormationsByFiliere(filiereId).subscribe({

      next: (response) => {

        this.formations = response;

        if (this.data) {

          this.subjectForm.patchValue({

            formationId: this.data.formationId
          });
        }      
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

    if (this.subjectForm.invalid) {

      return;
    }

    this.loading = true;

    if (this.data) {
      
      this.updateSubject();
    }else {
      
      this.createSubject();
    }
  }

  /**
   * Création
   */
  createSubject(): void {

    this.subjectService.createSubject(this.subjectForm.value).subscribe({
      
      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Matière crée avec succès',
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
  }

  /**
   * Modification
   */
  updateSubject(): void {

    this.subjectService.updateSubject(this.data!.id, this.subjectForm.value).subscribe({

      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Matière modifiée avec succès',
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
  }
}

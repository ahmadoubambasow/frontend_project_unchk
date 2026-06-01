import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentGroup } from '../../../models/student-group.model';
import { StudentGroupService } from '../../../services/student-group';
import { Formation } from '../../../models/formation.model';
import { FormationService } from '../../../services/formation';

@Component({
  selector: 'app-group-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './group-form-dialog.html',
  styleUrl: './group-form-dialog.scss',
})
export class GroupFormDialog implements OnInit {

  /**
   * Loading
   */
  loading = false;

  /**
   * Form
   */
  groupForm!: FormGroup;

  /**
   * Formations
   */
  formations: Formation[] = [];

  

  constructor(
    
    private fb: FormBuilder,


    private formationService: FormationService,

    private groupService: StudentGroupService,

    private snackBar: MatSnackBar,

    public dialogRef: MatDialogRef<GroupFormDialog>,

    @Inject(MAT_DIALOG_DATA)
    public data: StudentGroup
  ) { 

    this.groupForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      capacity: [
        null,
        Validators.required
      ],

      formationId: [
        null,
        Validators.required
      ]
    });
  }

  ngOnInit(): void { 

    this.loadFormations();
  }

  /**
   * Load formations
   */
  loadFormations(): void {

  this.formationService

    .getFormations()

    .subscribe({

      next: (response) => {

        this.formations = response;

        if (this.data) {

          this.groupForm.patchValue({

            name: this.data.name,

            capacity: this.data.capacity,

            formationId:
              this.data.formationId
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

    if (this.groupForm.invalid) {

      return;
    }

    this.loading = true;

    if (this.data) {
      
      this.updateGroup();
    }
    else {
      
      this.createGroup();
    }
  }

  /**
   * Create group
   */
  createGroup(): void {
   
    this.groupService.createGroup(this.groupForm.value).subscribe({
   
      next: () => {

        this.loading = false;
   
        this.snackBar.open(
          'Groupe créé avec succès', 
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

  /**
   * Update group
   */
  updateGroup(): void {
   
    this.groupService.updateGroup(this.data.id, this.groupForm.value).subscribe({
   
      next: () => {

        this.loading = false;
   
        this.snackBar.open(
          'Groupe modifiée avec succès', 
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

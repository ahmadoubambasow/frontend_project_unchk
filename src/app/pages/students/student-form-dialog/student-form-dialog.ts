import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../../services/student';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-form-dialog',
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './student-form-dialog.html',
  styleUrl: './student-form-dialog.scss',
})
export class StudentFormDialog {

  /**
   * Loading state
   */
  loading = false;

  /**
   * Formulaire étudiant
   */
  studentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,

    private studentService: StudentService,

    public dialogRef: MatDialogRef<StudentFormDialog>,

    private snackBar: MatSnackBar
  ) {

    this.studentForm = this.fb.group({

      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      phone: [''],

      gender: ['MALE'],

      birthDate: [''],

      address: ['']
    });
  }

  /**
   * Soumission formulaire
   */
  submit(): void {

    if (this.studentForm.invalid) {

      return;
    }

    this.loading = true;

    this.studentService.createStudent(this.studentForm.value).subscribe({

      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Etudiant créé avec succès',
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
    })
  }
}

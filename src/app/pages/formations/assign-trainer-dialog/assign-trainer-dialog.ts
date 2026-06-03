import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../services/user-service';
import { FormationTrainerService } from '../../../services/formation-trainer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assign-trainer-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './assign-trainer-dialog.html',
  styleUrl: './assign-trainer-dialog.scss',
})
export class AssignTrainerDialog implements OnInit {

  form!: FormGroup;

  trainers: any[] = [];

  loading = false;

  constructor(

    private fb: FormBuilder,

    private userService: UserService,

    private formationTrainerService: FormationTrainerService,

    private snackBar: MatSnackBar,

    public dialogRef: MatDialogRef<AssignTrainerDialog>,

    @Inject(MAT_DIALOG_DATA)

    public formationId: number

  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({

      trainerId: ['', Validators.required]
    });
      
    this.loadTrainers();
  }

  loadTrainers(): void {

    this.userService.getTrainers().subscribe({

      next: (response) => {

        this.trainers = response;
      },

      error: console.error
    });
  }

  submit(): void {

    if (this.form.invalid) {

      return;
    }

    this.loading = true;

    this.formationTrainerService.assignTrainer(this.formationId, this.form.value.trainerId)

      .subscribe({
        next: () => {

          this.loading = false;

          this.snackBar.open(
            
            'Formateur affecté',

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

          const message = error.error?.message

          ||

          'Impossible d\'affecter le formateur';

          this.snackBar.open(
            message,
            'Fermer',
            {
              duration: 4000
            }
          );
        }
      })
  }
}

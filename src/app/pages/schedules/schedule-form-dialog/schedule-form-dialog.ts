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
import { Trainer } from '../../../models/trainer.model';
import { FormationService } from '../../../services/formation';
import { TrainerService } from '../../../services/trainer';
import { ScheduleService } from '../../../services/schedule';

@Component({
  selector: 'app-schedule-form-dialog',
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
  templateUrl: './schedule-form-dialog.html',
  styleUrl: './schedule-form-dialog.scss',
})
export class ScheduleFormDialog implements OnInit {

  loading = false;

  scheduleForm!: FormGroup;

  formations: Formation[] = [];

  trainers: Trainer[] = [];

  sessionTypes = [

    'COURSE',

    'TD',

    'TP',

    'EXAM'
  ];
  
  constructor(

    private fb: FormBuilder,

    private formationService: FormationService,

    private trainerService: TrainerService,

    private scheduleService: ScheduleService,

    private snackBar: MatSnackBar,

    public dialogRef: MatDialogRef<ScheduleFormDialog>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

    this.scheduleForm = this.fb.group({

      title: ['', Validators.required],

      sessionType: ['', Validators.required],

      date: ['', Validators.required],

      startTime: ['', Validators.required],

      endTime: ['', Validators.required],

      room: [''],

      formationId: [null, Validators.required],

      trainerId: [null, Validators.required]
    });
  }

  ngOnInit(): void {

    this.loadFormations();

    this.loadTrainers();
  }

  /**
   * Chargement formations
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
   * Chargement formateurs
   */
  loadTrainers(): void {

    this.trainerService.getTrainers().subscribe({

      next: (response) => {

        this.trainers = response;

        if (this.data) {

          this.patchForm();
        }
      },
      error: (error) => {

        console.error(error);
      }
    });
  }

  /**
   * Pré-remplissage
   */
  patchForm(): void {

    this.scheduleForm.patchValue({

      title: this.data?.title,

      sessionType: this.data?.sessionType,

      date: this.data?.date,

      startTime: this.data?.startTime,

      endTime: this.data?.endTime,

      room: this.data?.room,

      formationId: this.data?.formationId,

      trainerId: this.data?.trainerId
    })
  }

  /**
   * Soumission
   */
  submit(): void {

    if (this.scheduleForm.invalid) {

      return;
    }

    const start = this.scheduleForm.value.startTime;

    const end = this.scheduleForm.value.endTime;

    if (start >= end) {

      this.snackBar.open(
        'Heures de début invalide',
        'Fermer',
        {
          duration: 3000
        }
      );

      return;
    }

    this.loading = true;

    if (this.data) {

      this.ubdateSchedule();

      return;
    }

    this.createSchedule();
  }

  /**
   * Création
   */
  createSchedule(): void {

    this.scheduleService.createSchedule(this.scheduleForm.value).subscribe({

      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Séance créé avec succès',
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
   * Modification
   */
  ubdateSchedule(): void {

    this.scheduleService.updateSchedule(this.data.id, this.scheduleForm.value).subscribe({

      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Séance modifiée avec succès',
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

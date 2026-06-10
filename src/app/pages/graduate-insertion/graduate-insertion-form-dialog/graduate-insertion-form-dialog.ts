import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
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
  MatSelectModule
} from '@angular/material/select';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { Student } from '../../../models/student.model';
import { GraduateInsertionService } from '../services/graduate-insertion';
import { StudentService } from '../../../services/student';
import { GraduateInsertion } from '../models/graduate-insertion.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-graduate-insertion-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],

  templateUrl:
    './graduate-insertion-form-dialog.html',

  styleUrl:
    './graduate-insertion-form-dialog.scss'
})
export class GraduateInsertionFormDialog
implements OnInit {

  form!: FormGroup;

  loading = false;

  students: Student[] = [];

  readonly statuses = [

    'SALARIED',

    'AUTO_EMPLOYED',

    'FURTHER_STUDIES',

    'UNEMPLOYED'
  ];

  constructor(

    private fb:
      FormBuilder,

    private insertionService:
      GraduateInsertionService,

    private studentService:
      StudentService,

    private snackBar:
      MatSnackBar,

    private cdr: ChangeDetectorRef,

    public dialogRef:
      MatDialogRef<GraduateInsertionFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data?: GraduateInsertion

  ) {}

  ngOnInit(): void {

    this.buildForm();

    this.loadStudents();

    if (this.data) {

      this.patchForm();
    }
  }

  buildForm(): void {

    this.form = this.fb.group({

      studentId: [
        '',
        Validators.required
      ],

      status: [
        'SALARIED',
        Validators.required
      ],

      company: [''],

      position: [''],

      startDate: [''],

      salary: [0],

      remarks: ['']
    });
  }

  loadStudents(): void {

    this.studentService

      .getStudents()

      .subscribe({

        next: response => {

          this.students =
            response;

          this.cdr.detectChanges();
        },

        error: console.error
      });
  }

  patchForm(): void {

    this.form.patchValue({

      studentId:
        this.data?.studentId,

      status:
        this.data?.status,

      company:
        this.data?.company,

      position:
        this.data?.position,

      startDate:
        this.data?.startDate,

      salary:
        this.data?.salary,

      remarks:
        this.data?.remarks
    });
  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    if (this.data?.id) {

      this.insertionService

        .update(
          this.data.id,
          this.form.value
        )

        .subscribe({

          next: () => {

            this.loading = false;

            this.snackBar.open(

              'Insertion modifiée',

              'Fermer',

              {
                duration: 3000
              }
            );

            this.dialogRef.close(true);
          },

          error: error => {

            console.error(error);

            this.loading = false;
          }
        });

      return;
    }

    this.insertionService

      .create(
        this.form.value
      )

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(

            'Insertion créée',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.dialogRef.close(true);
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  getStatusLabel(
    status: string
  ): string {

    switch (status) {

      case 'SALARIED':
        return 'Emploi salarié';

      case 'AUTO_EMPLOYED':
        return 'Auto emploi';

      case 'FURTHER_STUDIES':
        return 'Poursuite études';

      case 'UNEMPLOYED':
        return 'Sans emploi';

      default:
        return status;
    }
  }
}
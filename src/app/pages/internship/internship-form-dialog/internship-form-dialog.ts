import {
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
import { Partner } from '../../partners/models/partner.model';
import { InternshipService } from '../services/internship-service';
import { StudentService } from '../../../services/student';
import { PartnerService } from '../../partners/services/partner';
import { Internship } from '../models/internship.model';


@Component({
  selector: 'app-internship-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],

  templateUrl:
    './internship-form-dialog.html',

  styleUrl:
    './internship-form-dialog.scss'
})
export class InternshipFormDialog
implements OnInit {

  form!: FormGroup;

  loading = false;

  students: Student[] = [];

  partners: Partner[] = [];

  readonly statuses = [

    'ONGOING',

    'COMPLETED',

    'CANCELLED'
  ];

  constructor(

    private fb:
      FormBuilder,

    private internshipService:
      InternshipService,

    private studentService:
      StudentService,

    private partnerService:
      PartnerService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<InternshipFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data?: Internship

  ) {}

  ngOnInit(): void {

    this.buildForm();

    this.loadStudents();

    this.loadPartners();

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

      partnerId: [
        '',
        Validators.required
      ],

      supervisor: [
        '',
        Validators.required
      ],

      startDate: [
        '',
        Validators.required
      ],

      endDate: [
        '',
        Validators.required
      ],

      status: [
        'ONGOING',
        Validators.required
      ],

      evaluation: [''],

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
        },

        error: console.error
      });
  }

  loadPartners(): void {

    this.partnerService

      .getAll()

      .subscribe({

        next: response => {

          this.partners =
            response;
        },

        error: console.error
      });
  }

  patchForm(): void {

    this.form.patchValue({

      studentId:
        this.data?.studentId,

      partnerId:
        this.data?.partnerId,

      supervisor:
        this.data?.supervisor,

      startDate:
        this.data?.startDate,

      endDate:
        this.data?.endDate,

      status:
        this.data?.status,

      evaluation:
        this.data?.evaluation,

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

      this.internshipService

        .update(
          this.data.id,
          this.form.value
        )

        .subscribe({

          next: () => {

            this.loading = false;

            this.snackBar.open(

              'Stage modifié',

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

    this.internshipService

      .create(
        this.form.value
      )

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(

            'Stage créé',

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
}
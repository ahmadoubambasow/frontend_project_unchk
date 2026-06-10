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
import { User } from '../../../models/user.model';
import { StudentContactService } from '../services/student-contact-service';
import { StudentService } from '../../../services/student';
import { UserService } from '../../../services/user-service';
import { StudentContact } from '../models/Student-contact.model';
import { MatIconModule } from '@angular/material/icon';






@Component({
  selector: 'app-student-contact-form-dialog',

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
    './student-contact-form-dialog.html',

  styleUrl:
    './student-contact-form-dialog.scss'
})
export class StudentContactFormDialog
implements OnInit {

  form!: FormGroup;

  loading = false;

  students: Student[] = [];

  users: User[] = [];

  readonly contactTypes = [

    'PHONE',

    'EMAIL',

    'VISIT',

    'MEETING'
  ];

  constructor(

    private fb:
      FormBuilder,

    private contactService:
      StudentContactService,

    private studentService:
      StudentService,

    private userService:
      UserService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<StudentContactFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data?: StudentContact

  ) {}

  ngOnInit(): void {

    this.buildForm();

    this.loadStudents();

    this.loadUsers();

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

      createdById: [
        '',
        Validators.required
      ],

      contactDate: [
        '',
        Validators.required
      ],

      contactType: [
        'PHONE',
        Validators.required
      ],

      subject: [
        '',
        Validators.required
      ],

      description: [
        '',
        Validators.required
      ]
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

  loadUsers(): void {

    this.userService

      .getUsers()

      .subscribe({

        next: response => {

          this.users =
            response;
        },

        error: console.error
      });
  }

  patchForm(): void {

    this.form.patchValue({

      studentId:
        this.data?.studentId,

      createdById:
        this.data?.createdById,

      contactDate:
        this.data?.contactDate,

      contactType:
        this.data?.contactType,

      subject:
        this.data?.subject,

      description:
        this.data?.description
    });
  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    if (this.data?.id) {

      this.contactService

        .update(
          this.data.id,
          this.form.value
        )

        .subscribe({

          next: () => {

            this.loading = false;

            this.snackBar.open(

              'Contact modifié',

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

    this.contactService

      .create(
        this.form.value
      )

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(

            'Contact créé',

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

  getTypeLabel(
    type: string
  ): string {

    switch (type) {

      case 'PHONE':
        return 'Téléphone';

      case 'EMAIL':
        return 'Email';

      case 'VISIT':
        return 'Visite';

      case 'MEETING':
        return 'Réunion';

      default:
        return type;
    }
  }
}
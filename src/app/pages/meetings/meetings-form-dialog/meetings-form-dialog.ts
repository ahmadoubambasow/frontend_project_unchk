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

import {
  Meeting
} from '../../../models/meeting.model';

import {
  StudentGroup
} from '../../../models/student-group.model';

import {
  User
} from '../../../models/user.model';

import {
  StudentGroupService
} from '../../../services/student-group';

import {
  UserService
} from '../../../services/user-service';

import {
  MeetingService
} from '../../../services/meeting-service';

@Component({
  selector: 'app-meeting-form-dialog',

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
    './meetings-form-dialog.html',

  styleUrl:
    './meetings-form-dialog.scss'
})
export class MeetingFormDialog
implements OnInit {

  form!: FormGroup;

  loading = false;

  groups: StudentGroup[] = [];

  users: User[] = [];

  constructor(

    private fb:
      FormBuilder,

    private meetingService:
      MeetingService,

    private groupService:
      StudentGroupService,

    private userService:
      UserService,

    private snackBar:
      MatSnackBar,

    private cdr:
      ChangeDetectorRef,

    public dialogRef:
      MatDialogRef<MeetingFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data?: Meeting

  ) {}

  ngOnInit(): void {

    this.buildForm();

    this.loadGroups();

    this.loadUsers();

    if (this.data) {

      this.patchForm();
    }
  }

  buildForm(): void {

    this.form = this.fb.group({

      title: [
        '',
        Validators.required
      ],

      type: [
        'TUTORAT',
        Validators.required
      ],

      status: [
        'PLANIFIEE',
        Validators.required
      ],

      meetingDate: [
        '',
        Validators.required
      ],

      startTime: [
        '',
        Validators.required
      ],

      endTime: [
        '',
        Validators.required
      ],

      description: [''],

      report: [''],

      organizerId: [
        '',
        Validators.required
      ],

      groupId: [''],

      participantIds: [[]]
    });
  }

  loadGroups(): void {

    this.groupService

      .getGroups()

      .subscribe({

        next: response => {

          this.groups = response;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(error);
        }
      });
  }

  loadUsers(): void {

    this.userService

      .getUsers()

      .subscribe({

        next: response => {

          this.users = response;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(error);
        }
      });
  }

  patchForm(): void {

    this.form.patchValue({

      title:
        this.data?.title,

      type:
        this.data?.type,

      status:
        this.data?.status,

      meetingDate:
        this.data?.meetingDate,

      startTime:
        this.data?.startTime,

      endTime:
        this.data?.endTime,

      description:
        this.data?.description,

      report:
        this.data?.report,

      organizerId:
        this.data?.organizerId,

      groupId:
        this.data?.groupId,

      participantIds:
        this.data?.participantIds ?? []
    });
  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    if (this.data?.id) {

      this.meetingService

        .update(

          this.data.id,

          this.form.value

        )

        .subscribe({

          next: () => {

            this.loading = false;

            this.snackBar.open(

              'Réunion modifiée',

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

            this.snackBar.open(

              'Erreur lors de la modification',

              'Fermer',

              {
                duration: 3000
              }
            );
          }
        });

      return;
    }

    this.meetingService

      .create(
        this.form.value
      )

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(

            'Réunion créée',

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

          this.snackBar.open(

            'Erreur lors de la création',

            'Fermer',

            {
              duration: 3000
            }
          );
        }
      });
  }

  close(): void {

    this.dialogRef.close();
  }
}
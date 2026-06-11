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

import { User } from '../../../models/user.model';

import { UserService } from '../../../services/user-service';
import { PersonnelFileService } from '../services/personnel-file-service';
import { PersonnelFile } from '../models/personnel-file.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-personnel-file-form-dialog',

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
    './personnel-file-form-dialog.html',

  styleUrl:
    './personnel-file-form-dialog.scss'
})
export class PersonnelFileFormDialog
implements OnInit {

  form!: FormGroup;

  loading = false;

  users: User[] = [];

  selectedFile?: File;

  readonly contractTypes = [

    'CDI',

    'CDD',

    'VACATAIRE',

    'PRESTATAIRE'
  ];

  constructor(

    private fb:
      FormBuilder,

    private service:
      PersonnelFileService,

    private userService:
      UserService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<PersonnelFileFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data?: PersonnelFile

  ) {}

  ngOnInit(): void {

    this.buildForm();

    this.loadUsers();

    if (this.data) {

      this.patchForm();
    }
  }

  buildForm(): void {

    this.form = this.fb.group({

      userId: [
        '',
        Validators.required
      ],

      employeeNumber: [''],

      contractType: [''],

      hireDate: [''],

      position: [''],

      salary: [0],

      diploma: [''],

      phone: [''],

      address: [''],

      filePath: ['']
    });
  }

  loadUsers(): void {

    this.userService

      .getUsers()

      .subscribe({

        next: response => {

          this.users = response;
        },

        error: console.error
      });
  }

  patchForm(): void {

    this.form.patchValue({

      userId:
        this.data?.userId,

      employeeNumber:
        this.data?.employeeNumber,

      contractType:
        this.data?.contractType,

      hireDate:
        this.data?.hireDate,

      position:
        this.data?.position,

      salary:
        this.data?.salary,

      diploma:
        this.data?.diploma,

      phone:
        this.data?.phone,

      address:
        this.data?.address,

      filePath:
        this.data?.filePath
    });
  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    const request = {
      ...this.form.value
    };

    if (this.selectedFile) {

      const formData = new FormData();

      formData.append(
        'file',
        this.selectedFile
      );

      this.service

        .uploadFile(formData)

        .subscribe({

          next: response => {

            request.filePath =
              response.filePath;

            this.savePersonnel(
              request
            );
          },

          error: error => {

            console.error(error);

            this.loading = false;
          }
        });

      return;
    }

    this.savePersonnel(
      request
    );
  }

  private savePersonnel(
    request: any
  ): void {

    if (this.data?.id) {

      this.service

        .update(
          this.data.id,
          request
        )

        .subscribe({

          next: () => {

            this.loading = false;

            this.snackBar.open(
              'Dossier modifié',
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

    this.service

      .create(request)

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(
            'Dossier créé',
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

  onFileSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (input.files?.length) {

      this.selectedFile =
        input.files[0];
    }
  }
}
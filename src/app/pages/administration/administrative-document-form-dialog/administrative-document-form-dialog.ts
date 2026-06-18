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
import { AdministrativeDocumentService } from '../services/administrative-document';
import { UserService } from '../../../services/user-service';
import { AdministrativeDocument } from '../models/administrative-document.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-administrative-document-form-dialog',

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
    './administrative-document-form-dialog.html',

  styleUrl:
    './administrative-document-form-dialog.scss'
})
export class AdministrativeDocumentFormDialog
implements OnInit {

  /**
   * Form
   */
  form!: FormGroup;

  /**
   * Loading
   */
  loading = false;

  /**
   * Users
   */
  users: User[] = [];

  /**
   * Selected file
   */
  selectedFile?: File;

  /**
   * Document types
   */
  readonly documentTypes = [

    'INCOMING_MAIL',

    'OUTGOING_MAIL',

    'INTERNAL_NOTE',

    'EXTERNAL_NOTE',

    'ADMINISTRATIVE_NOTE',

    'CIRCULAR'
  ];

  /**
   * Statut du document
   */
  readonly documentStatuses = [

    'DRAFT',

    'SENT',

    'RECEIVED',

    'ARCHIVED'
  ];

  constructor(

    private fb:
      FormBuilder,

    private documentService:
      AdministrativeDocumentService,

    private userService:
      UserService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<AdministrativeDocumentFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data?: AdministrativeDocument

  ) {}

  ngOnInit(): void {

    // Build form
    this.buildForm();

    // Load users
    this.loadUsers();

    // Patch form
    if (this.data) {

      this.patchForm();
    }
  }

  /**
   * Build form
   */
  buildForm(): void {

    this.form = this.fb.group({

      title: [
        '',
        Validators.required
      ],

      type: [
        '',
        Validators.required
      ],

      status: [
        'DRAFT',
        Validators.required
      ],

      documentDate: [
        '',
        Validators.required
      ],

      issuerId: [
        '',
        Validators.required
      ],

      recipientId: [
        '',
        Validators.required
      ],

      description: [''],

      filePath: ['']
    });
  }

  /**
   * Load users
   */
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

  /**
   * Patch form
   */
  patchForm(): void {

    this.form.patchValue({

      title:
        this.data?.title,

      type:
        this.data?.type,

      status:
        this.data?.status,

      documentDate:
        this.data?.documentDate,

      issuerId:
        this.data?.issuerId,

      recipientId:
        this.data?.recipientId,

      description:
        this.data?.description,

      filePath:
        this.data?.filePath
    });
  }

  /**
   * Submit
   */
  submit(): void {

  if (this.form.invalid) {

    this.form.markAllAsTouched();

    return;
  }

  this.loading = true;

  const request = this.form.value;

  if (this.selectedFile) {

    const formData = new FormData();

    formData.append(
      'file',
      this.selectedFile
    );

    this.documentService
      .uploadFile(formData)
      .subscribe({

      next: response => {

        request.filePath =
          response.filePath;

      

        this.saveDocument(
          request
        );
      },

      error: error => {

        console.error(error);

        this.loading = false;
      }
    })

    return;
  }

  this.saveDocument(
    request
  );
}

  /**
   * On file selected
   */
  onFileSelected(
    event: Event
  ): void {

    const input = event.target as HTMLInputElement;

    if (input.files?.length) {

      this.selectedFile =
        input.files[0];
    }
  }

  /**
   * Save document
   */
  private saveDocument(
    request: any
  ): void {

    if (this.data?.id) {

      this.documentService

        .update(
          this.data.id,
          request
        )

        .subscribe({

          next: () => {

            this.loading = false;

            this.snackBar.open(
              'Document modifié',
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

    this.documentService

      .create(request)

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(
            'Document créé',
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

  /**
   * Get type label
   */
  getTypeLabel(
    type: string
  ): string {

    const labels: Record<string, string> = {

      INCOMING_MAIL:
        'Courrier arrivé',

      OUTGOING_MAIL:
        'Courrier départ',

      INTERNAL_NOTE:
        'Note interne',

      EXTERNAL_NOTE:
        'Note externe',

      ADMINISTRATIVE_NOTE:
        'Note administrative',

      CIRCULAR:
        'Circulaire'
    };

    return labels[type] || type;
  }

  /**
   * Get status label
   */
  getStatusLabel(
    status: string
  ): string {

    const labels: Record<string, string> = {

      DRAFT:
        'Brouillon',

      SENT:
        'Envoyé',

      RECEIVED:
        'Reçu',

      ARCHIVED:
        'Archivé'
    };

    return labels[status] || status;
  }
}
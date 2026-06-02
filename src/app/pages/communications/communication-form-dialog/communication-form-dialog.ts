import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommunicationService } from '../../../services/communication-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Communication } from '../../../models/communication.model';

@Component({
  selector: 'app-communication-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './communication-form-dialog.html',
  styleUrl: './communication-form-dialog.scss',
})
export class CommunicationFormDialog implements OnInit{

  /**
   * Loading
   */
  loading = false;

  /**
   * Form
   */
  communicationForm!: FormGroup;

  /**
   * Selected file
   */
  selectedFile?: File;

  selectedFileName = '';

  /**
   * Communication types
   */
  communicationTypes = [

    'MEETING',

    'ENCOUNTER',

    'SEMINAR',

    'WEBINAR',

    'UNIVERSITY_COUNCIL',

    'CIRCULAR'
  ];

  /**
   * Acess roles
   */
  accessRoles = [

    'ADMIN',

    'ADMINISTRATIVE',

    'TEACHER',

    'TUTOR',

    'STUDENT',

    'ALL'
  ];

  constructor(

    private fb: FormBuilder,

    private communicationService:
      CommunicationService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<CommunicationFormDialog>,

    @Inject(MAT_DIALOG_DATA)
    public data:Communication | null

  ) {

    this.communicationForm = 

      this.fb.group({

        title: [
          '',
          Validators.required
        ],

        type: [
          '',
          Validators.required
        ],

        description: [
          '',
          Validators.required
        ],

        report: [
          '',
          Validators.required
        ],

        eventDate: [
          '',
          Validators.required
        ],

        documentName: [''],

        documentUrl: [''],

        documentType: [''],

        accessRole: [
          'ALL',
          Validators.required
        ]

      });
  }

  ngOnInit(): void {

    if (this.data) {

      this.communicationForm.patchValue(this.data);
    }
  }

  /**
   * On file selected
   */
  onFileSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.selectedFile = input.files[0];

      this.selectedFileName = this.selectedFile.name;
      
    }
  }

  /**
 * Submit
 */
submit(): void {

  if (this.communicationForm.invalid) {

    return;
  }

  this.loading = true;

  /**
   * UPDATE
   */
  if (this.data) {

    this.communicationService

      .updateCommunication(
        this.data.id,
        this.communicationForm.value
      )

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(
            'Communication modifiée avec succès',
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

    return;
  }

  /**
   * CREATE + UPLOAD
   */
  if (this.selectedFile) {

    this.communicationService

      .uploadFile(this.selectedFile)

      .subscribe({

        next: (url: string) => {

          const payload = {

            ...this.communicationForm.value,

            documentName:
              this.selectedFile?.name,

            documentUrl:
              url,

            documentType:
              this.selectedFile?.type
          };

          this.saveCommunication(
            payload
          );
        },

        error: (error) => {

          this.loading = false;

          console.error(error);

          this.snackBar.open(
            'Erreur lors du téléchargement du document',
            'Fermer',
            {
              duration: 3000
            }
          );
        }
      });

    return;
  }

  /**
   * CREATE SANS DOCUMENT
   */
  this.saveCommunication(
    this.communicationForm.value
  );
}

/**
 * Save communication
 */
private saveCommunication(
  payload: any
): void {

  this.communicationService

    .createCommunication(
      payload
    )

    .subscribe({

      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Communication créée avec succès',
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

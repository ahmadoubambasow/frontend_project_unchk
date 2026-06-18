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

import { StudentFileService } from '../services/student-file';
import { StudentService } from '../../../services/student';
import { StudentFile } from '../models/student-file.model';
import { Student } from '../../../models/student.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-file-form-dialog',

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
    './student-file-form-dialog.html',

  styleUrl:
    './student-file-form-dialog.scss'
})
export class StudentFileFormDialog implements OnInit {

  /**
   * Formulaire
   */
  form!: FormGroup;

  /**
   * Liste des étudiants
   */
  students: Student[] = [];

  /**
   * Photo selectionnée
   */
  selectedPhoto?: File;

  /**
   * Diplome selectionnée
   */
  selectedDiploma?: File;

  /**
   * Certificat de naissance selectionnée
   */
  selectedBirthCertificate?: File;

  /**
   * Chargement
   */
  loading = false;

  constructor(

    private fb: 
      FormBuilder,

    private service: 
      StudentFileService,

    private studentService: 
      StudentService,

    private snackBar: 
      MatSnackBar,

    private cdr: 
      ChangeDetectorRef,

    public dialogRef:
      MatDialogRef<StudentFileFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data?: StudentFile

  ) {}

  ngOnInit(): void {

    // Construction du formulaire
    this.buildForm();

    // Chargement des utilisateurs
    this.loadStudents();

    if (this.data) {

      this.patchForm();
    }
  }

  /**
   * Construction du formulaire
   */
  buildForm(): void {

    this.form = this.fb.group({

      studentId: [
        '',
        Validators.required
      ],

      registrationNumber: [''],

      guardianName: [''],

      guardianPhone: [''],

      address: [''],

      previousSchool: [''],

      remarks: [''],

      photoPath: [''],

      diplomaPath: [''],

      birthCertificatePath: ['']
    });
  }

  /**
   * Chargement des utilisateurs
   */
  loadStudents(): void {

    this.studentService

      .getStudents()

      .subscribe({

        next: response => {

          this.students = response;

          this.cdr.detectChanges();
        }
      });
  }

  /**
   * Formulaire
   * @returns 
   */
  patchForm(): void {

    if (!this.data) {
      return;
    }

    this.form.patchValue(
      this.data
    );
  }

  /**
   * Envoi du formulaire
   */
  submit(): void {

    // Vérification formulaire
    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    const request = {
      ...this.form.value
    };

    // Envoi du formulaire
    this.saveStudentFile(
      request
    );
  }

  /**
   * Envoi du formulaire
   */
  saveStudentFile(
    request: any
  ): void {

    // Mise à jour si id existe
    if (this.data?.id) {

      this.service

        .update(
          this.data.id,
          request
        )

        .subscribe({

          next: () => {

            this.snackBar.open(
              'Dossier modifié',
              'Fermer',
              {
                duration: 3000
              }
            );

            this.dialogRef.close(true);
          }
        });

      return;
    }

    // Création sinon
    this.service

      .create(request)

      .subscribe({

        next: () => {

          this.snackBar.open(
            'Dossier créé',
            'Fermer',
            {
              duration: 3000
            }
          );

          this.dialogRef.close(true);
        }
      });
  }

  /**
   * Photo selectionnée
   * @param event 
   */
  onPhotoSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (input.files?.length) {

      this.selectedPhoto =
        input.files[0];
    }
  }

  /**
   * Diplome selectionnée
   * @param event 
   */
  onDiplomaSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (input.files?.length) {

      this.selectedDiploma =
        input.files[0];
    }
  }

  /**
   * Certificat de naissance selectionnée
   * @param event 
   */
  onBirthCertificateSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (input.files?.length) {

      this.selectedBirthCertificate =
        input.files[0];
    }
  }
}
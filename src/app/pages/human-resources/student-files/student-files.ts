import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  MatDialog
} from '@angular/material/dialog';

import {
  MatSnackBar
} from '@angular/material/snack-bar';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatInputModule
} from '@angular/material/input';

import {
  StudentFileFormDialog
} from '../student-file-form-dialog/student-file-form-dialog';
import { StudentFile } from '../models/student-file.model';
import { StudentFileService } from '../services/student-file';

@Component({
  selector: 'app-student-files',

  standalone: true,

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],

  templateUrl:
    './student-files.html',

  styleUrl:
    './student-files.scss'
})
export class StudentFiles
implements OnInit {

  studentFiles: StudentFile[] = [];

  filteredStudentFiles:
    StudentFile[] = [];

  loading = false;

  constructor(

    private service:
      StudentFileService,

    private dialog:
      MatDialog,

    private snackBar:
      MatSnackBar,

    private router:
      Router,

      private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadStudentFiles();
  }

  loadStudentFiles(): void {

    this.loading = true;

    this.service

      .getAll()

      .subscribe({

        next: response => {

          this.studentFiles =
            response;

          this.filteredStudentFiles =
            response;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  applyFilter(
    event: Event
  ): void {

    const value = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredStudentFiles =

      this.studentFiles.filter(

        student =>

          student.fullName
            ?.toLowerCase()
            .includes(value)

          ||

          student.registrationNumber
            ?.toLowerCase()
            .includes(value)

          ||

          student.guardianName
            ?.toLowerCase()
            .includes(value)
      );
  }

  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        StudentFileFormDialog,

        {
          width: '950px',
          maxWidth: '95vw'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadStudentFiles();
        }
      });
  }

  openDetails(
    student: StudentFile
  ): void {

    this.router.navigate([
      '/student-files',
      student.id
    ]);
  }

  openEditDialog(
    student: StudentFile
  ): void {

    const dialogRef =

      this.dialog.open(

        StudentFileFormDialog,

        {
          width: '950px',
          maxWidth: '95vw',

          data: student
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadStudentFiles();
        }
      });
  }

  deleteStudentFile(
    student: StudentFile
  ): void {

    if (

      !confirm(
        'Supprimer ce dossier ?'
      )

    ) {

      return;
    }

    this.service

      .delete(
        student.id
      )

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Dossier supprimé',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.loadStudentFiles();
        }
      });
  }
}
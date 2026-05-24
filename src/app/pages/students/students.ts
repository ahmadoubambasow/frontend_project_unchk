import { ChangeDetectorRef, Component } from '@angular/core';
import {StudentService } from '../../services/student';
import { Student } from '../../models/student.model';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentFormDialog } from './student-form-dialog/student-form-dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-students',
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './students.html',
  styleUrl: './students.scss',
})
export class Students {

  /**
   * Liste étudiants
   */
  students: Student[] = [];

  /**
   * Colonnes table
   */
  displayedColumns = [
    'matricule',
    'fullName',
    'email',
    'phone',
    'status'
  ];

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Initiaisation composant
   */
  ngOnInit(): void {

    this.loadStudents();
  }

  /**
   * Chargement étudiants
   */
  loadStudents(): void {

    this.studentService.getStudents().subscribe({
      
      next: (response) => {
        console.log(response);

        this.students = response;

        this.cdr.detectChanges();
      },
      error: (err) => {

        console.error(err);
      }
    });

  }

  /**
   * Ouvrir dialog création étudiant
   */
  openCreateDialog(): void {

    const dialogRef = this.dialog.open(
      StudentFormDialog,

      {
        width: '550px',
        height: '90%'
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      
      // Refresh liste
      this.loadStudents();
    })
  }
}

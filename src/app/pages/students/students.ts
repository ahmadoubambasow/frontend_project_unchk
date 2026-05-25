import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {StudentService } from '../../services/student';
import { Student } from '../../models/student.model';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentFormDialog } from './student-form-dialog/student-form-dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students',
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule
  ],
  templateUrl: './students.html',
  styleUrl: './students.scss',
})
export class Students {

  /**
   * Liste étudiants
   */
  dataSource = new MatTableDataSource<Student> ();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  /**
   * Colonnes table
   */
  displayedColumns = [
    'matricule',
    'fullName',
    'email',
    'phone',
    'status',
    'actions'
  ];

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
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

        this.dataSource.data = response;

        this.dataSource.paginator = this.paginator;

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

  /**
   * Filtre étudiants
   */
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Suppression étudiant
   */
  deleteStudent(student: Student): void {

    const confirmed = confirm(
      `Confirmer la suppression de l'etudiant ${student.firstName} ${student.lastName}`
    );
    
    if (!confirmed) {
      return;
    }

    this.studentService.deleteStudent(student.id).subscribe({
      next: () => {

        // Notification
        this.snackBar.open(
          'Etudiant supprimé avec succès',
          'Fermer',
          {
            duration: 3000
          }
        );

        this.loadStudents();
      },
      error: (err) => {

        console.error(err);

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

  /**
 * Ouvre dialog modification.
 */
openEditDialog(
    student: Student
  ): void {

    console.log(student);

    const dialogRef =
      this.dialog.open(

        StudentFormDialog,

        {
          width: '550px',

          height: '90%',

          data: student
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadStudents();
        }
      });
  }
}

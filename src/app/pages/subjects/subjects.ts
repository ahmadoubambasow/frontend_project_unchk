import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject } from '../../models/subject.model';
import { SubjectService } from '../../services/subject';
import { SubjectsFormDialog } from '../subjects-form-dialog/subjects-form-dialog';

@Component({
  selector: 'app-subjects',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './subjects.html',
  styleUrl: './subjects.scss',
})
export class Subjects implements OnInit {

  /**
   * Data source
   */
  dataSource = new MatTableDataSource<Subject>();

  @ViewChild(MatPaginator) 
  paginator!: MatPaginator;

  displayedColumns = [

    'code',

    'name',

    'filiere',

    'formation',

    'coefficient',

    'hours',

    'actions'
  ];

  constructor(

    private subjectService: SubjectService,

    private dialog: MatDialog,

    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.loadSubjects();

    this.dataSource.filterPredicate = (
      
      data: Subject,

      filter: string
    ) => {

      const search = (
        
        data.code +
        
        ' ' +
        
        data.name +
        
        ' ' +
        
        data.filiereName +
        
        ' ' +
        
        data.formationName 
        
      ).toLowerCase();

      return search.includes(filter);
    };
  }

  /**
   * Load subjects
   */
  loadSubjects(): void {

    this.subjectService.getSubjects().subscribe({

      next: (response) => {

        this.dataSource.data = response;

        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {

        console.error(error);
      }
    });
  }

  /**
   * Apply filter
   */
  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Open dialog
   */
  openCreateDialog(): void {

    const dialogRef = this.dialog.open(SubjectsFormDialog, {

      width: '550px',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.loadSubjects();
      }
    });
  }

  /**
   * Open edit dialog
   */
  openEditDialog(subject: Subject): void {

    const dialogRef = this.dialog.open(SubjectsFormDialog, {

      width: '550px',
      height: '90%',
      data: subject
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.loadSubjects();
      }
    });
  }

  /**
   * Delete subject
   */
  deleteSubject(subject: Subject): void {

    const confirmed = confirm('Confirmer la suppression de cette matière ?');

    if (!confirmed) {

      return;
    }

    this.subjectService.deleteSubject(subject.id).subscribe({

      next: () => {

        this.snackBar.open('Matière supprimée avec succès', 'Fermer', {

          duration: 3000
        });

        this.loadSubjects();
      },
      error: (error) => {

        console.error(error);
      }
    });
  }
}

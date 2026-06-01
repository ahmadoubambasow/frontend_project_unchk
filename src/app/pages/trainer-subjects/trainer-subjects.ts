import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TrainerSubjectService } from '../../services/trainer-subject';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrainerSubject } from '../../models/trainer-subject.model';
import { TrainerSubjectsFormDialog } from './trainer-subjects-form-dialog/trainer-subjects-form-dialog';

@Component({
  selector: 'app-trainer-subjects',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule

  ],
  templateUrl: './trainer-subjects.html',
  styleUrl: './trainer-subjects.scss',
})
export class TrainerSubjects implements OnInit {

  /**
   * Data source
   */
  dataSource = new MatTableDataSource<TrainerSubject>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns = [

    'trainer',

    'subject',

    'formation',

    'filiere',

    'actions'
  ];

  constructor(

    private trainerSubjectService: TrainerSubjectService,

    private dialog: MatDialog,

    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
      
    this.loadAssignments();

    this.dataSource.filterPredicate = (

      data: TrainerSubject,

      filter: string
    ) => {

       const searchText = (

        data.trainerName +

        ' ' +

        data.subjectName +

        ' ' +

        data.formationName +

        ' ' +

        data.filiereName

      ).toLowerCase();

      return searchText.includes(filter);
    };
  }

  /**
   * Chargement
   */
  loadAssignments(): void {

    this.trainerSubjectService.getAssignments().subscribe({

      next: (response) => {

        this.dataSource.data = response;

        this.dataSource.paginator = this.paginator;
      
      },

      error: (error) => {
        
        console.error(error);
      }
    })
  }

  /**
   * Filtre
   */
  applyFilter(event: Event): void {

    const filterValue = (
      event.target as HTMLInputElement
    ).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Nouveau
   */
  openCreateDialog(): void {

    const dialogRef = this.dialog.open(TrainerSubjectsFormDialog, {

      width: '550px',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.loadAssignments();
      }
    });
  }

  /**
   * Suppression
   */
  deleteAssignment(assignment: TrainerSubject): void {

    const confirmed = confirm(`Supprimer cette affectation ?`);

    if (!confirmed) {

      return;
    }

    this.trainerSubjectService.deleteAssignment(assignment.id).subscribe({

      next: () => {

        this.snackBar.open('Affectation supprimée', 'Fermer', {

          duration: 3000
        });

        this.loadAssignments();
      },
      error: (error) => {

        console.error(error);
      }
    });
  }
}

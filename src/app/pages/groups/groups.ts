import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StudentGroup } from '../../models/student-group.model';
import { V } from '@angular/cdk/keycodes';
import { StudentGroupService } from '../../services/student-group';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupFormDialog } from './group-form-dialog/group-form-dialog';

@Component({
  selector: 'app-groups',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './groups.html',
  styleUrl: './groups.scss',
})
export class Groups implements OnInit {

  /**
   * 
   */
  dataSource = new MatTableDataSource<StudentGroup>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns = [

    'name',

    'promotion',

    'formation',

    'capacity',

    'actions'
  ];

  constructor(

    private groupService: StudentGroupService,

    private dialog: MatDialog,

    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.loadGroups();

    this.dataSource.filterPredicate = (

      data,

      filter
    ) => {

      const search = (

        data.name +

        ' '+

        data.formationName +

        ' ' +

        data.formationName
      ).toLowerCase();

      return search.includes(filter);
    };
  }

  /**
   * Load groups
   */
  loadGroups(): void {

    this.groupService.getGroups().subscribe({

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
   * Filter
   */
  applyFilter(event: Event): void {

    const value = (event.target as HTMLInputElement).value;

    this.dataSource.filter = value.trim().toLowerCase();
  }

  /**
   * Open dialog
   */
  openCreateDialog(): void {

    const dialogRef = this.dialog.open(GroupFormDialog, 

      {
        width: '550px',
        height: '90%'
      }
    );

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.loadGroups();
      }
    });
  }

  /**
   * Open edit dialog
   */
  openEditDialog(group: StudentGroup): void {

    const dialogRef = this.dialog.open(GroupFormDialog,

      {
        width: '550px',
        height: '90%',
        data: group
      }
    );

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.loadGroups();
      }
    });
  }

  /**
   *  Suppression
   */
  deleteGroup(group: StudentGroup): void {

    const confirmed = confirm('Confirmer la suppression de ce groupe ?');

    if (!confirmed) {

      return;
    }

    this.groupService.deleteGroup(group.id).subscribe({

      next: () => {

        this.snackBar.open('Groupe supprimée avec succès', 'Fermer', {

          duration: 3000
        });

        this.loadGroups();
      },
      error: (error) => {

        console.error(error);
      }
    });
  }
}

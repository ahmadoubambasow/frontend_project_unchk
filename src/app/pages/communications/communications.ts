import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTab } from '@angular/material/tabs';
import { Communication } from '../../models/communication.model';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommunicationService } from '../../services/communication-service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommunicationFormDialog } from './communication-form-dialog/communication-form-dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-communications',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './communications.html',
  styleUrl: './communications.scss',
})
export class Communications implements OnInit {

  /**
   * DATA SOURCE
   */
  dataSource = new MatTableDataSource<Communication>();

  /**
   * Columns
   */
  displayedColumns = [

    'title',

    'type',

    'eventDate',

    'accessRole',

    'actions'
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(

    private communicationService: CommunicationService,

    private dialog: MatDialog,

    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {}

  /**
   * Chargement des communications
   */
  loadCommunications(): void {

    this.communicationService.getCommunications().subscribe({
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

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Open create dialog
   */
  openCreateDialog(): void {

    const dialogRef = this.dialog.open(CommunicationFormDialog, {

      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.loadCommunications();
      }
    });
  }

  /**
   * Open edit dialog
   */
  editCommunication(communication: Communication): void {

    const dialogRef = this.dialog.open(CommunicationFormDialog, {

      width: '550px',
      height: '90%',

      data: communication
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {

        this.loadCommunications();
      }
    });
  }

  /**
   * Delete
   */
  deleteCommunication(communication: Communication): void {

    const confirmed = confirm('Confirmer la suppression de cette communication ?');

    if (!confirmed) {

      return;
    }

    this.communicationService.deleteCommunication(communication.id).subscribe({
      
      next: () => {

        this.loadCommunications();
      },
      error: (error) => {

        console.error(error);
      }
    });
  }
}

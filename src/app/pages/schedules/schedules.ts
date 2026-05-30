import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ScheduleService } from '../../services/schedule';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Schedule } from '../../models/schedule.model';
import { ScheduleFormDialog } from './schedule-form-dialog/schedule-form-dialog';

@Component({
  selector: 'app-schedules',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './schedules.html',
  styleUrl: './schedules.scss',
})
export class Schedules implements OnInit {

  /**
   * Data source
   */
  dataSource = new MatTableDataSource<Schedule>();

  /**
   * Paginator
   */
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  /**
   * Colonnes
   */
  displayedColumns = [

    'title',

    'formation',

    'trainer',

    'sessionType',

    'date',

    'startTime',

    'endTime',

    'room',

    'actions'
  ];

  constructor(

    private scheduleService: ScheduleService,

    private dialog: MatDialog,

    private snackBar: MatSnackBar
  ) { }

  /**
   * Initialisation
   */
  ngOnInit(): void {

    this.loadSchedules();
  }

  /**
   * Chargement séances
   */
  loadSchedules(): void {

    this.scheduleService.getSchedules().subscribe({

      next: (response) => {

        console.log(response);

        this.dataSource.data = response;

        this.dataSource.paginator = this.paginator;
      },

      error: (error) => {

        console.error(error);
      }
    });
  }

  /**
   * Filtre
   */
  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Création
   */
  openCreateDialog(): void {

    const dialogRef = this.dialog.open(ScheduleFormDialog, {

      width: '550px',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadSchedules();
      }
    });
  }

  /**
   * Modification
   */
  openEditDialog(schedule: Schedule): void {

    const dialogRef = this.dialog.open(ScheduleFormDialog, {

      width: '550px',
      height: '90%',

      data: schedule
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadSchedules();
      }
    });
  }

  /** 
   * Suppression
   */
  deleteSchedule(schedule: Schedule): void {

    const confirmed = confirm('Confirmer la suppression de cette séance ?');

    if (!confirmed) {

      return;
    }

    this.scheduleService.deleteSchedule(schedule.id).subscribe({

      next: () => {

        this.snackBar.open(
          'Séance supprimée avec succès', 
          'Fermer', 
          
          {

            duration: 3000
          }
        );

        this.loadSchedules();
      },

      error: (error) => {

        console.error(error);
      }
    })
  }
}

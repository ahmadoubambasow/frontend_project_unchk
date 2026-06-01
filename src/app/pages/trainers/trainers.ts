import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Trainer } from '../../models/trainer.model';
import { TrainerService } from '../../services/trainer';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrainerFormDialog } from './trainer-form-dialog/trainer-form-dialog';

@Component({
  selector: 'app-trainers',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './trainers.html',
  styleUrl: './trainers.scss',
})
export class Trainers implements OnInit {


  /**
   * Data source
   */
  dataSource = new MatTableDataSource<Trainer>();

  /**
   * Paginator
   */
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  /**
   * Colonnes
   */
  displayedColumns = [
    'fullName',
    'email',
    'phone',
    'speciality',
    'grade',
    'type',
    'actions'
  ];

  constructor(
    private trainerService: TrainerService,

    private dialog: MatDialog,

    private snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {

    this.loadTrainers();
  }

  /**
   * Chargement formateurs
   */
  loadTrainers(): void {

    this.trainerService.getTrainers().subscribe({

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

    const dialogRef = this.dialog.open(TrainerFormDialog, {

      width: '550px',
      height: '90%'
    
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadTrainers();
      }
    });
  }

  /**
   * Modification
   */
  openEditDialog(trainer: Trainer): void {

    const dialogRef = this.dialog.open(TrainerFormDialog, {

      width: '550px',
      height: '90%',

      data: trainer
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadTrainers();
      }
    });
  }

  /**
   * Suppression
   */
  deleteTrainer(trainer: Trainer): void {

    const confirmef = confirm('Voulez-vous vraiment supprimer ce formateur ?');

    if (!confirmef) {

      return;
    }

    this.trainerService.deleteTrainer(trainer.id).subscribe({

      next: () => {

        this.snackBar.open(
          'Formateur supprimé avec succès', 
          'Fermer', 
          {
            duration: 3000
          }
        );

        this.loadTrainers();  
      },
      error: (error) => {

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

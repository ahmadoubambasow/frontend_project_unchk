import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Formation } from '../../models/formation.model';
import { FormationService } from '../../services/formation';
import { FormationFormDialog } from './formation-form-dialog/formation-form-dialog';

@Component({
  selector: 'app-formations',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './formations.html',
  styleUrl: './formations.scss',
})
export class Formations {

  /**
   * Data source table
   */
  dataSource = new MatTableDataSource<Formation>();

  /**
   * Paginator
   */
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  /**
   * Colonnes table
   */
  displayedColumns = [

    'code',

    'name',

    'duration',

    'status',

    'actions'
  ];

  constructor(
    private formationService: FormationService,

    private dialog: MatDialog,

    private cdr: ChangeDetectorRef,

    private snackBar: MatSnackBar
  ) {}

  /**
   * Initialisation composant
   */
  ngOnInit(): void {

    this.loadFormations();
  }

  /**
   * Chargement formations
   */
  loadFormations(): void {

    this.formationService.getFormations().subscribe({

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
   * Ouvrir dialof création
   */
  openCreateDialog(): void {

    const dialogRef = this.dialog.open(FormationFormDialog, {

      width: '550px',
      height: '90%'
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        this.loadFormations();
      }
    });
  }
  /**
   * Filtre formations
   */
  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Ouvre dialog modification
   */
  openEditDialog(formation: Formation): void {

    const dialogRef = this.dialog.open(FormationFormDialog, {

      width: '550px',
      height: '90%',
      data: formation
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadFormations();
      }
    });
  }

  /**
   * Suppression formation
   */
  deleteFormation(formation: Formation): void {

    const confirmed = confirm(
      `Confirmer la suppression de la formation ${formation.name}`
    );

    if (!confirmed) {
      return;
    }

    this.formationService.deleteFormation(formation.id).subscribe({
      
      next: () => {

        // Notification
        this.snackBar.open(
          'Formation supprimée avec succès',
          'Fermer',
          {
            duration: 3000
          }
        );

        this.loadFormations();
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
    })
  }
}

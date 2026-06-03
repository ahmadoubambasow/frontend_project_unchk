import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';

import {
  MatPaginator,
  MatPaginatorModule
} from '@angular/material/paginator';

import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  Formation
} from '../../models/formation.model';

import {
  FormationService
} from '../../services/formation';

import {
  FormationFormDialog
} from './formation-form-dialog/formation-form-dialog';

import { Router } from '@angular/router';

import { ConfirmDialog } from '../../shared/dialogs/confirm-dialog/confirm-dialog';
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
export class Formations
implements OnInit, AfterViewInit {

  /**
   * Source de données
   */
  dataSource =
    new MatTableDataSource<Formation>();

  /**
   * Chargement
   */
  loading = false;

  /**
   * Nombre total
   */
  totalFormations = 0;

  /**
   * Paginator
   */
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  /**
   * Colonnes affichées
   */
  displayedColumns = [

    'name',

    'formationType',

    'level',

    'period',

    'trainers',

    'actions'
  ];

  constructor(

    private formationService: FormationService,

    private dialog: MatDialog,

    private cdr: ChangeDetectorRef,

    private snackBar: MatSnackBar,

    private router: Router

  ) {}

  /**
   * Initialisation
   */
  ngOnInit(): void {

    this.loadFormations();
  }

  /**
   * Pagination
   */
  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;
  }

  /**
   * Chargement formations
   */
  loadFormations(): void {

    this.loading = true;

    this.formationService

      .getFormations()

      .subscribe({

        next: (response) => {

          this.dataSource.data =
            response;

          this.totalFormations =
            response.length;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(error);

          this.loading = false;

          this.snackBar.open(

            'Erreur lors du chargement des formations',

            'Fermer',

            {
              duration: 3000
            }
          );
        }
      });
  }

  /**
   * Recherche
   */
  applyFilter(
    event: Event
  ): void {

    const filterValue =

      (event.target as HTMLInputElement)

        .value;

    this.dataSource.filter =

      filterValue

        .trim()

        .toLowerCase();
  }

  /**
   * Création
   */
  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        FormationFormDialog,

        {

          width: '900px',

          maxWidth: '95vw',

          maxHeight: '90vh',

          autoFocus: false
        }
      );

    dialogRef

      .afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadFormations();
        }
      });
  }

  /**
   * Modification
   */
  openEditDialog(
    formation: Formation
  ): void {

    const dialogRef =

      this.dialog.open(

        FormationFormDialog,

        {

          width: '900px',

          maxWidth: '95vw',

          maxHeight: '90vh',

          autoFocus: false,

          data: formation
        }
      );

    dialogRef

      .afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadFormations();
        }
      });
  }

  /**
   * Déatils formation
   */
  viewFormation(
    formation: Formation
  ): void {

    this.router.navigate(
      ['/formations', formation.id]
    )
  }

  /**
   * Suppression
   */
  deleteFormation(
    formation: Formation
  ): void {

    const dialogRef = this.dialog.open(

  ConfirmDialog,

  {

    width: '450px',

    data: {

      title: 'Suppression',

      message:
        `Voulez-vous vraiment supprimer la formation "${formation.name}" ?`,

      confirmText: 'Supprimer',

      cancelText: 'Annuler'
    }
  }
);

dialogRef.afterClosed().subscribe(

  confirmed => {

    if (!confirmed) {

      return;
    }

    this.formationService

      .deleteFormation(
        formation.id
      )

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Formation supprimée avec succès',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.loadFormations();
        },

        error: (error) => {

          console.error(error);

          this.snackBar.open(

            'Erreur lors de la suppression',

            'Fermer',

            {
              duration: 3000
            }
          );
        }
      });
  }
);
  }

  /**
   * Nombre de formateurs
   */
  getTrainerCount(
    formation: Formation
  ): number {

    return formation.trainers?.length || 0;
  }

  /**
   * Période formatée
   */
  getPeriod(
    formation: Formation
  ): string {

    return `${formation.startDate} → ${formation.endDate}`;
  }
}
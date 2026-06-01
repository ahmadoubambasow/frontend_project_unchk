import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

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
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatSnackBar
} from '@angular/material/snack-bar';

import { Filiere } from '../../models/filiere.model';

import { FiliereService }
from '../../services/filiere';

import {
  FiliereFormDialog
} from './filiere-form-dialog/filiere-form-dialog';

@Component({
  selector: 'app-filieres',

  standalone: true,

  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],

  templateUrl: './filieres.html',

  styleUrl: './filieres.scss'
})
export class Filieres
implements OnInit {

  dataSource =
    new MatTableDataSource<Filiere>();

  displayedColumns = [

    'code',

    'name',

    'description',

    'actions'
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(

    private filiereService:
      FiliereService,

    private dialog:
      MatDialog,

    private snackBar:
      MatSnackBar

  ) {}

  ngOnInit(): void {

    this.loadFilieres();
  }

  loadFilieres(): void {

    this.filiereService

      .getFilieres()

      .subscribe({

        next: (response) => {

          this.dataSource.data =
            response;

          this.dataSource.paginator =
            this.paginator;
        },

        error: (error) => {

          console.error(error);
        }
      });
  }

  applyFilter(
    event: Event
  ): void {

    const value =

      (event.target as HTMLInputElement)

      .value;

    this.dataSource.filter =

      value

        .trim()

        .toLowerCase();
  }

  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        FiliereFormDialog,

        {
          width: '550px'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadFilieres();
        }
      });
  }

  openEditDialog(
    filiere: Filiere
  ): void {

    const dialogRef =

      this.dialog.open(

        FiliereFormDialog,

        {
          width: '550px',

          data: filiere
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadFilieres();
        }
      });
  }

  deleteFiliere(
    filiere: Filiere
  ): void {

    const confirmed = confirm(

      `Supprimer cette filière ?`
    );

    if (!confirmed) {

      return;
    }

    this.filiereService

      .deleteFiliere(
        filiere.id
      )

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Filière supprimée',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.loadFilieres();
        },

        error: (error) => {

          console.error(error);
        }
      });
  }
}
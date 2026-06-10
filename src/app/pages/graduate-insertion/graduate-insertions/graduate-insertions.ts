import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  MatDialog
} from '@angular/material/dialog';

import {
  MatSnackBar
} from '@angular/material/snack-bar';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatInputModule
} from '@angular/material/input';
import { GraduateInsertion } from '../models/graduate-insertion.model';
import { GraduateInsertionService } from '../services/graduate-insertion';
import { GraduateInsertionFormDialog } from '../graduate-insertion-form-dialog/graduate-insertion-form-dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from "@angular/material/divider";



@Component({
  selector: 'app-graduate-insertions',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDivider
],

  templateUrl:
    './graduate-insertions.html',

  styleUrl:
    './graduate-insertions.scss'
})
export class GraduateInsertions
implements OnInit {

  insertions:
    GraduateInsertion[] = [];

  filteredInsertions:
    GraduateInsertion[] = [];

  loading = false;


  constructor(

    private insertionService:
      GraduateInsertionService,

    private dialog:
      MatDialog,

    private snackBar:
      MatSnackBar,

    private router:
      Router,

    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadInsertions();
  }

  loadInsertions(): void {

    this.loading = true;

    this.insertionService

      .getAll()

      .subscribe({

        next: response => {

          this.insertions = response;

          this.filteredInsertions = response;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  applyFilter(
    event: Event
  ): void {

    const value =

      (event.target as HTMLInputElement)
        .value
        .toLowerCase();

    this.filteredInsertions =

      this.insertions.filter(

        insertion =>

          insertion.studentName
            ?.toLowerCase()
            .includes(value)

          ||

          insertion.company
            ?.toLowerCase()
            .includes(value)

          ||

          insertion.status
            ?.toLowerCase()
            .includes(value)
      );
  }

  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        GraduateInsertionFormDialog,

        {
          width: '900px',
          maxWidth: '95vw'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadInsertions();
        }
      });
  }

  openEditDialog(
    insertion: GraduateInsertion
  ): void {

    const dialogRef =

      this.dialog.open(

        GraduateInsertionFormDialog,

        {
          width: '900px',
          maxWidth: '95vw',
          data: insertion
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadInsertions();
        }
      });
  }

  openDetails(
    insertion: GraduateInsertion
  ): void {

    this.router.navigate([

      '/graduate-insertions',

      insertion.id
    ]);
  }

  deleteInsertion(
    insertion: GraduateInsertion
  ): void {

    this.insertionService

      .delete(
        insertion.id
      )

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Insertion supprimée',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.loadInsertions();
        }
      });
  }

  getStatusLabel(
    status: string
  ): string {

    switch (status) {

      case 'SALARIED':
        return 'Emploi salarié';

      case 'AUTO_EMPLOYED':
        return 'Auto emploi';

      case 'FURTHER_STUDIES':
        return 'Poursuite études';

      case 'UNEMPLOYED':
        return 'Sans emploi';

      default:
        return status;
    }
  }
}
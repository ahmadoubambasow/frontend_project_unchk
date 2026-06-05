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
import { Internship } from '../models/internship.model';
import { InternshipService } from '../services/internship-service';
import { InternshipFormDialog } from '../internship-form-dialog/internship-form-dialog';

@Component({
  selector: 'app-internships',

  standalone: true,

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],

  templateUrl: './internship.html',

  styleUrl: './internship.scss'
})
export class Internships
implements OnInit {

  internships: Internship[] = [];

  filteredInternships: Internship[] = [];

  loading = false;

  constructor(

    private internshipService:
      InternshipService,

    private dialog:
      MatDialog,

    private snackBar:
      MatSnackBar,

    private router:
      Router,

    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadInternships();
  }

  loadInternships(): void {

    this.loading = true;

    this.internshipService

      .getAll()

      .subscribe({

        next: response => {

          this.internships = response;

          this.filteredInternships = response;

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

      ?.value

      ?.toLowerCase()

      || '';

    this.filteredInternships =

      this.internships.filter(

        internship =>

          internship.studentName
            ?.toLowerCase()
            .includes(value)

          ||

          internship.partnerName
            ?.toLowerCase()
            .includes(value)

          ||

          internship.status
            ?.toLowerCase()
            .includes(value)
      );
  }

  openDetails(
    internship: Internship
  ): void {

    this.router.navigate([

      '/internships',

      internship.id

    ]);
  }

  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        InternshipFormDialog,

        {
          width: '850px',
          maxWidth: '95vw'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadInternships();
        }
      });
  }

  openEditDialog(
    internship: Internship
  ): void {

    const dialogRef =

      this.dialog.open(

        InternshipFormDialog,

        {
          width: '850px',
          maxWidth: '95vw',
          data: internship
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadInternships();
        }
      });
  }

  deleteInternship(
    internship: Internship
  ): void {

    this.internshipService

      .delete(
        internship.id
      )

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Stage supprimé',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.loadInternships();
        }
      });
  }
}
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
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-internships',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDivider
],

  templateUrl: './internship.html',

  styleUrl: './internship.scss'
})
export class Internships implements OnInit {

  /**
   * Internships
   */
  internships: Internship[] = [];

  /**
   * Filtered Internships
   */
  filteredInternships: Internship[] = [];

  /**
   * Loading
   */
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

    private cdr: 
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadInternships();
  }

  /**
   * Load Internships
   */
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

  /**
   * Filtre des stages
   * @param event 
   */
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

          // Filtre sur le Nom
          internship.studentName
            ?.toLowerCase()
            .includes(value)

          ||

          // Filtre sur le partenaire
          internship.partnerName
            ?.toLowerCase()
            .includes(value)

          ||

          // Filtre sur le status
          internship.status
            ?.toLowerCase()
            .includes(value)
      );
  }

  /**
   * Ouvre les details d'un stage
   */
  openDetails(
    internship: Internship
  ): void {

    this.router.navigate([

      '/internships',

      internship.id

    ]);
  }

  /**
   * Ouvre le formulaire de creation
   */
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

  /**
   * Ouvre le formulaire de modification
   * @param internship 
   */
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

  /**
   * Supprime un stage
   * @param internship 
   */
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
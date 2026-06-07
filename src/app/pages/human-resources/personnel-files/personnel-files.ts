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

import {
  PersonnelFileFormDialog
} from '../personnel-file-form-dialog/personnel-file-form-dialog';
import { PersonnelFile } from '../models/personnel-file.model';
import { PersonnelFileService } from '../services/personnel-file-service';

@Component({
  selector: 'app-personnel-files',

  standalone: true,

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],

  templateUrl:
    './personnel-files.html',

  styleUrl:
    './personnel-files.scss'
})
export class PersonnelFiles
implements OnInit {

  personnelFiles: PersonnelFile[] = [];

  filteredPersonnelFiles:
    PersonnelFile[] = [];

  loading = false;

  teachersCount = 0;

  tutorsCount = 0;

  adminCount = 0;

  constructor(

    private service:
      PersonnelFileService,

    private dialog:
      MatDialog,

    private snackBar:
      MatSnackBar,

    private router:
      Router,

      private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadPersonnelFiles();
  }

  loadPersonnelFiles(): void {

    this.loading = true;

    this.service

      .getAll()

      .subscribe({

        next: response => {

          this.personnelFiles =
            response;

          this.filteredPersonnelFiles =
            response;

          this.calculateStats();

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  calculateStats(): void {

    this.teachersCount =

      this.personnelFiles.filter(

        p =>

          p.role ===
          'ENSEIGNANT'

      ).length;

    this.tutorsCount =

      this.personnelFiles.filter(

        p =>

          p.role ===
          'TUTEUR'

      ).length;

    this.adminCount =

      this.personnelFiles.filter(

        p =>

          p.role ===
          'ADMIN'

          ||

          p.role ===
          'RESPONSABLE_FORMATION'

      ).length;
  }

  applyFilter(
    event: Event
  ): void {

    const value = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredPersonnelFiles =

      this.personnelFiles.filter(

        personnel =>

          personnel.fullName
            ?.toLowerCase()
            .includes(value)

          ||

          personnel.employeeNumber
            ?.toLowerCase()
            .includes(value)

          ||

          personnel.position
            ?.toLowerCase()
            .includes(value)
      );
  }

  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        PersonnelFileFormDialog,

        {
          width: '950px',
          maxWidth: '95vw'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadPersonnelFiles();
        }
      });
  }

  openEditDialog(
    personnel: PersonnelFile
  ): void {

    const dialogRef =

      this.dialog.open(

        PersonnelFileFormDialog,

        {
          width: '950px',
          maxWidth: '95vw',

          data: personnel
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadPersonnelFiles();
        }
      });
  }

  openDetails(
    personnel: PersonnelFile
  ): void {

    this.router.navigate([

      '/personnel-files',

      personnel.id
    ]);
  }

  deletePersonnelFile(
    personnel: PersonnelFile
  ): void {

    if (

      !confirm(
        'Supprimer ce dossier ?'
      )

    ) {

      return;
    }

    this.service

      .delete(
        personnel.id
      )

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Dossier supprimé',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.loadPersonnelFiles();
        }
      });
  }
}
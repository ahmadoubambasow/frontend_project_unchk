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
import { StudentContact } from '../models/Student-contact.model';
import { StudentContactService } from '../services/student-contact-service';
import { StudentContactFormDialog } from '../student-contact-form-dialog/student-contact-form-dialog';



@Component({
  selector: 'app-student-contacts',

  standalone: true,

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],

  templateUrl:
    './students-contact.html',

  styleUrl:
    './students-contact.scss'
})
export class StudentContacts
implements OnInit {

  contacts: StudentContact[] = [];

  filteredContacts:
    StudentContact[] = [];

  loading = false;

  constructor(

    private contactService:
      StudentContactService,

    private dialog:
      MatDialog,

    private snackBar:
      MatSnackBar,

    private router:
      Router,

    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadContacts();
  }

  loadContacts(): void {

    this.loading = true;

    this.contactService

      .getAll()

      .subscribe({

        next: response => {

          this.contacts =
            response;

          this.filteredContacts =
            response;

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

    const target = event.target as HTMLInputElement;
    const value = (target && target.value ? target.value : '').toLowerCase();

    this.filteredContacts =

      this.contacts.filter(

        contact =>

          contact.studentName
            ?.toLowerCase()
            .includes(value)

          ||

          contact.subject
            ?.toLowerCase()
            .includes(value)

          ||

          contact.contactType
            ?.toLowerCase()
            .includes(value)
      );
  }

  openDetails(
    contact: StudentContact
  ): void {

    this.router.navigate([

      '/student-contacts',

      contact.id

    ]);
  }

  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        StudentContactFormDialog,

        {
          width: '850px',
          maxWidth: '95vw'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadContacts();
        }
      });
  }

  openEditDialog(
    contact: StudentContact
  ): void {

    const dialogRef =

      this.dialog.open(

        StudentContactFormDialog,

        {
          width: '850px',
          maxWidth: '95vw',
          data: contact
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadContacts();
        }
      });
  }

  deleteContact(
    contact: StudentContact
  ): void {

    this.contactService

      .delete(
        contact.id
      )

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Contact supprimé',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.loadContacts();
        }
      });
  }

  getTypeLabel(
    type: string
  ): string {

    switch (type) {

      case 'PHONE':
        return 'Téléphone';

      case 'EMAIL':
        return 'Email';

      case 'VISIT':
        return 'Visite';

      case 'MEETING':
        return 'Réunion';

      default:
        return type;
    }
  }
}
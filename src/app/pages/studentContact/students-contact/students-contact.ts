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
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-student-contacts',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],

  templateUrl:
    './students-contact.html',

  styleUrl:
    './students-contact.scss'
})
export class StudentContacts implements OnInit {

  /**
   * Liste des contacts
   */
  contacts: StudentContact[] = [];

  /**
   * Liste des contacts filtrés
   */
  filteredContacts:
    StudentContact[] = [];

    /**
     * Indicateur de chargement
     */
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

    private cdr: 
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadContacts();
  }

  /**
   * Récupérer la liste des contacts
   */
  loadContacts(): void {

    this.loading = true;

    this.contactService

      .getAll()

      .subscribe({

        next: response => {


          console.log(response);
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

  /**
   * Filtre des contacts
   * @param event 
   */
  applyFilter(
    event: Event
  ): void {

    const target = event.target as HTMLInputElement;
    const value = (target && target.value ? target.value : '').toLowerCase();

    // Filtrage
    this.filteredContacts =

      this.contacts.filter(

        contact =>

          // Filtre sur le Nom
          contact.studentName
            ?.toLowerCase()
            .includes(value)

          ||

          // Filtre sur le sujet
          contact.subject
            ?.toLowerCase()
            .includes(value)

          ||

          // Filtre sur le contact
          contact.contactType
            ?.toLowerCase()
            .includes(value)
      );
  }

  /**
   * Ouverture de la fiche de contact
   * @param contact 
   */
  openDetails(
    contact: StudentContact
  ): void {

    this.router.navigate([

      '/student-contacts',

      contact.id

    ]);
  }

  /**
   * Création d'un contact
   */
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

  /**
   * Formulaire Mise à jour d'un contact
   * @param contact 
   */
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

  /**
   * Suppression d'un contact
   * @param contact 
   */
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

  /**
   * Retourn le libellé du type de contact
   * @param type 
   * @returns 
   */
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
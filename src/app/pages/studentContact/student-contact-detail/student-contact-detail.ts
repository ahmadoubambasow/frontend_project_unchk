import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute
} from '@angular/router';

import {
  MatCardModule
} from '@angular/material/card';
import { StudentContact } from '../models/Student-contact.model';
import { StudentContactService } from '../services/student-contact-service';


@Component({
  selector: 'app-student-contact-details',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule
  ],

  templateUrl:
    './student-contact-detail.html',

  styleUrl:
    './student-contact-detail.scss'
})
export class StudentContactDetails
implements OnInit {

  /**
   * Contact
   */
  contact?: StudentContact;

  /**
   * Chargement
   */
  loading = false;

  constructor(

    private route:
      ActivatedRoute,

    private contactService:
      StudentContactService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    // Récupération d'id
    const id = Number(

      this.route.snapshot
        .paramMap
        .get('id')
    );

    // Chargement du document
    this.loadContact(id);
  }

  /**
   * Récupérer un contact
   * @param id 
   */
  loadContact(
    id: number
  ): void {

    this.loading = true;

    this.contactService

      .getById(id)

      .subscribe({

        next: response => {

          this.contact = response;

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
   * Retourne le label du type de document
   * @param type 
   * @returns 
   */
  getTypeLabel(
    type?: string
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
        return '-';
    }
  }
}
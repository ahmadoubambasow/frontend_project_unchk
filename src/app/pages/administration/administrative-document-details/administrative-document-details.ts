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
import { AdministrativeDocument } from '../models/administrative-document.model';
import { AdministrativeDocumentService } from '../services/administrative-document';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from "@angular/material/progress-spinner";


@Component({
  selector: 'app-administrative-document-details',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinner
],

  templateUrl:
    './administrative-document-details.html',

  styleUrl:
    './administrative-document-details.scss'
})
export class AdministrativeDocumentDetails
implements OnInit {

  /**
   * Le document administratif
   */
  document?: AdministrativeDocument;

  /**
   * Indique si le document est chargé
   */
  loading = false;

  constructor(

    private route:
      ActivatedRoute,

    private documentService:
      AdministrativeDocumentService,

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
    this.loadDocument(id);
  }

  /**
   * Chargement du document
   */
  loadDocument(
    id: number
  ): void {

    this.loading = true;

    this.documentService

      .getById(id)

      .subscribe({

        next: response => {

          this.document = response;

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
   */
  getTypeLabel(
    type?: string
  ): string {

    // Cas par defaut
    switch (type) {

      case 'INCOMING_MAIL':
        return 'Courrier arrivé';

      case 'OUTGOING_MAIL':
        return 'Courrier départ';

      case 'INTERNAL_NOTE':
        return 'Note interne';

      case 'EXTERNAL_NOTE':
        return 'Note externe';

      case 'ADMINISTRATIVE_NOTE':
        return 'Note administrative';

      case 'CIRCULAR':
        return 'Circulaire';

      default:
        return '-';
    }
  }

  /**
   * Ouverture du document
   */
  openDocument(
    filePath: string
  ): void {

    window.open(
      `http://localhost:8080/uploads/documents/${filePath}`,
      '_blank'
    );
  }
}
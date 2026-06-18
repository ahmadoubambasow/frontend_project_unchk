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
import { AdministrativeDocument } from '../models/administrative-document.model';
import { AdministrativeDocumentService } from '../services/administrative-document';
import { AdministrativeDocumentFormDialog } from '../administrative-document-form-dialog/administrative-document-form-dialog';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-administrative-documents',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinner
],

  templateUrl:
    './administrative-documents.html',

  styleUrl:
    './administrative-documents.scss'
})
export class AdministrativeDocuments
implements OnInit {

  /**
   * Liste des documents
   */
  documents:
    AdministrativeDocument[] = [];

    /**
     * Liste des documents filtrés
     */
  filteredDocuments:
    AdministrativeDocument[] = [];

    /**
     * Indicateur de chargement
     */
  loading = false;

  constructor(

    private documentService:
      AdministrativeDocumentService,

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

    // Chargement des documents
    this.loadDocuments();
  }

  /**
   * Chargement des documents
   */
  loadDocuments(): void {

    this.loading = true;

    this.documentService

      .getMyDocuments()

      .subscribe({

        next: response => {

          this.documents = response;

          this.filteredDocuments = response;

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
   * Filtre des documents
   */
  applyFilter(
    event: Event
  ): void {
    const input = event.target as HTMLInputElement | null;
    const value = input?.value?.toLowerCase() ?? '';

    this.filteredDocuments = this.documents.filter(
      document =>
        document.title
          ?.toLowerCase()
          .includes(value)
        ||
        document.referenceNumber
          ?.toLowerCase()
          .includes(value)
        ||
        document.type
          ?.toLowerCase()
          .includes(value)
    );
  }

  /**
   * Ouverture du formulaire de création
   */
  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        AdministrativeDocumentFormDialog,

        {
          width: '900px',
          maxWidth: '95vw'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadDocuments();
        }
      });
  }

  /**
   * Ouverture du formulaire de modification
   */
  openEditDialog(
    document: AdministrativeDocument
  ): void {

    const dialogRef =

      this.dialog.open(

        AdministrativeDocumentFormDialog,

        {
          width: '900px',
          maxWidth: '95vw',

          data: document
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadDocuments();
        }
      });
  }

  /**
   * Ouverture de la fiche d'un document
   */
  openDetails(
    document: AdministrativeDocument
  ): void {

    this.router.navigate([

      '/administrative-documents',

      document.id
    ]);
  }

  /**
   * Suppression d'un document
   */
  deleteDocument(
    document: AdministrativeDocument
  ): void {

    this.documentService

      .delete(
        document.id
      )

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Document supprimé',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.loadDocuments();
        }
      });
  }

  /**
   * Retourne le label du type de document
   */
  getTypeLabel(
    type: string
  ): string {

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
        return type;
    }
  }
}
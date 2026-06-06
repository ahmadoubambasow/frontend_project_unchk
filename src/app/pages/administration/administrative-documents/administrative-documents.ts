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


@Component({
  selector: 'app-administrative-documents',

  standalone: true,

  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],

  templateUrl:
    './administrative-documents.html',

  styleUrl:
    './administrative-documents.scss'
})
export class AdministrativeDocuments
implements OnInit {

  documents:
    AdministrativeDocument[] = [];

  filteredDocuments:
    AdministrativeDocument[] = [];

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

      private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadDocuments();
  }

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

  openDetails(
    document: AdministrativeDocument
  ): void {

    this.router.navigate([

      '/administrative-documents',

      document.id
    ]);
  }

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
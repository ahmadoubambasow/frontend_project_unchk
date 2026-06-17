import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule,
  DatePipe
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  MatCardModule
} from '@angular/material/card';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  Communication
} from '../../../models/communication.model';

import {
  CommunicationService
} from '../../../services/communication-service';

@Component({
  selector: 'app-archives',

  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './archives.html',

  styleUrl: './archives.scss'
})
export class Archives
implements OnInit {

  /**
   * Archives
   */
  archives: Communication[] = [];

  /**
   * Recherche
   */
  search = '';

  /**
   * Loading
   */
  loading = false;

  constructor(

    private communicationService:
      CommunicationService,

    private cdr: 
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadArchives();
  }

  /**
   * Chargement archives
   */
  loadArchives(): void {

    this.loading = true;

    this.communicationService

      .getArchives()

      .subscribe({

        next: (response) => {

          console.log(response);
          this.archives = response;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  /**
   * Recherche
   */
  get filteredArchives(): Communication[] {

    return this.archives.filter(

      archive =>

        archive.title

          ?.toLowerCase()

          .includes(

            this.search
              .toLowerCase()
          )

        ||

        archive.documentName

          ?.toLowerCase()

          .includes(

            this.search
              .toLowerCase()
          )
    );
  }

  /**
   * Icône document
   */
  getDocumentIcon(
    type: string
  ): string {

    if (

      type?.includes(
        'pdf'
      )

    ) {

      return 'picture_as_pdf';
    }

    if (

      type?.includes(
        'image'
      )

    ) {

      return 'image';
    }

    if (

      type?.includes(
        'word'
      )

    ) {

      return 'description';
    }

    return 'folder';
  }

  /**
   * Consulter
   */
  previewDocument(
    archive: Communication
  ): void {

    window.open(

      'http://localhost:8080' + archive.documentUrl,

      '_blank'
    );
  }

  /**
   * Télécharger
   */
  downloadDocument(
  archive: Communication
): void {

  window.open(

    `http://localhost:8080/api/files/download/${archive.id}`,

    '_blank'
  );
}
}
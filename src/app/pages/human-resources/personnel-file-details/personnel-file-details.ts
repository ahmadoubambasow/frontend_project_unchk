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
import { PersonnelFile } from '../models/personnel-file.model';
import { PersonnelFileService } from '../services/personnel-file-service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-personnel-file-details',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],

  templateUrl:
    './personnel-file-details.html',

  styleUrl:
    './personnel-file-details.scss'
})
export class PersonnelFileDetails implements OnInit {

  /**
   * Personnel
   */
  personnel?: PersonnelFile;

  /**
   * Loading
   */
  loading = false;

  constructor(

    private route:
      ActivatedRoute,

    private service:
      PersonnelFileService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    const id = Number(

      this.route.snapshot
        .paramMap
        .get('id')
    );

    this.loadPersonnel(id);
  }

  /**
   * Chargement d'un personnel
   * @param id 
   */
  loadPersonnel(
    id: number
  ): void {

    this.loading = true;

    this.service

      .getById(id)

      .subscribe({

        next: response => {

          this.personnel = response;

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
   * Verification de l'image
   * @param path 
   * @returns 
   */
  isImage(
    path?: string
  ): boolean {

    if (!path) {

      return false;
    }

    const extension =

      path
        .split('.')
        .pop()
        ?.toLowerCase();

    return [

      'jpg',
      'jpeg',
      'png',
      'webp'

    ].includes(
      extension || ''
    );
  }

  /**
   * Ouverture du document
   * @param filePath 
   */
  openDocument(filePath: string): void {

    window.open(
      this.personnel?.filePath,
      '_blank'
    );
  }
}
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
import { GraduateInsertion } from '../models/graduate-insertion.model';
import { GraduateInsertionService } from '../services/graduate-insertion';

@Component({
  selector: 'app-graduate-insertion-details',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule
  ],

  templateUrl:
    './graduate-insertion-details.html',

  styleUrl:
    './graduate-insertion-details.scss'
})
export class GraduateInsertionDetails implements OnInit {

  /**
   * Insertion
   */
  insertion?: GraduateInsertion;

  /**
   * Loading
   */
  loading = false;

  constructor(

    private route:
      ActivatedRoute,

    private insertionService:
      GraduateInsertionService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    const id = Number(

      this.route.snapshot
        .paramMap
        .get('id')
    );

    this.loadInsertion(id);
  }

  /**
   * Load insertion
   * @param id 
   */
  loadInsertion(
    id: number
  ): void {

    this.loading = true;

    this.insertionService

      .getById(id)

      .subscribe({

        next: response => {

          this.insertion = response;

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
   * Get status label
   * @param status
   */
  getStatusLabel(
    status?: string
  ): string {

    switch (status) {

      case 'SALARIED':
        return 'Emploi salarié';

      case 'AUTO_EMPLOYED':
        return 'Auto emploi';

      case 'FURTHER_STUDIES':
        return 'Poursuite d’études';

      case 'UNEMPLOYED':
        return 'Sans emploi';

      default:
        return '-';
    }
  }
}
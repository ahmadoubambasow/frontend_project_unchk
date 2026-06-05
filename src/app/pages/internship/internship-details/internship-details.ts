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
import { Internship } from '../models/internship.model';
import { InternshipService } from '../services/internship-service';


@Component({
  selector: 'app-internship-details',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule
  ],

  templateUrl:
    './internship-details.html',

  styleUrl:
    './internship-details.scss'
})
export class InternshipDetails
implements OnInit {

  internship?: Internship;

  loading = false;

  constructor(

    private route:
      ActivatedRoute,

    private internshipService:
      InternshipService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    const id = Number(

      this.route.snapshot
        .paramMap
        .get('id')
    );

    this.loadInternship(id);
  }

  loadInternship(
    id: number
  ): void {

    this.loading = true;

    this.internshipService

      .getById(id)

      .subscribe({

        next: response => {

          this.internship =
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

  getStatusLabel(
    status?: string
  ): string {

    switch (status) {

      case 'ONGOING':
        return 'En cours';

      case 'COMPLETED':
        return 'Terminé';

      case 'CANCELLED':
        return 'Annulé';

      default:
        return '-';
    }
  }
}
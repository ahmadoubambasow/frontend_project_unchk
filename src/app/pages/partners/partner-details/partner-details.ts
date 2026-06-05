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
import { Partner } from '../models/partner.model';
import { PartnerService } from '../services/partner';


@Component({
  selector: 'app-partner-details',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule
  ],

  templateUrl:
    './partner-details.html',

  styleUrl:
    './partner-details.scss'
})
export class PartnerDetails
implements OnInit {

  partner?: Partner;

  loading = false;

  constructor(

    private route:
      ActivatedRoute,

    private partnerService:
      PartnerService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    const id = Number(

      this.route.snapshot
        .paramMap
        .get('id')
    );

    this.loadPartner(id);
  }

  loadPartner(
    id: number
  ): void {

    this.loading = true;

    this.partnerService

      .getById(id)

      .subscribe({

        next: response => {

          this.partner = response;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }
}
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  MatDialog
} from '@angular/material/dialog';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  PartnerFormDialog
} from '../partner-form-dialog/partner-form-dialog';
import { Partner } from '../models/partner.model';
import { PartnerService } from '../services/partner';
import { Router } from '@angular/router';
import { MatDivider } from "@angular/material/divider";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-partners',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDivider
],

  templateUrl: './partners.html',

  styleUrl: './partners.scss'
})
export class Partners
implements OnInit {

  partners: Partner[] = [];

  filteredPartners: Partner[] = [];

  loading = false;

  constructor(

    private service:
      PartnerService,

    private dialog:
      MatDialog,

    private router: Router,

      private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadPartners();
  }

  loadPartners(): void {

    this.loading = true;

    this.service

      .getAll()

      .subscribe({

        next: response => {

          this.partners =
            response;

          this.filteredPartners =
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

  applyFilter(event: Event): void {

    const filterValue =
      (event.target as HTMLInputElement).value;

    this.filteredPartners =
      this.partners.filter(partner =>
        partner.name
          .toLowerCase()
          .includes(filterValue));
  }


  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        PartnerFormDialog,

        {
          width: '800px',

          maxWidth: '95vh',

          maxHeight: '90vh'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadPartners();
        }
      });
  }

  openEditDialog(
    partner: Partner
  ): void {

    const dialogRef =

      this.dialog.open(

        PartnerFormDialog,

        {
          width: '800px',
          maxWidth: '95vw',
          maxHeight: '90vh',

          data: partner
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadPartners();
        }
      });
  }

  deletePartner(
    partner: Partner
  ): void {

    this.service

      .delete(
        partner.id
      )

      .subscribe(() => {

        this.loadPartners();
      });
  }


  openDetails(
    partner: Partner
  ): void {

    this.router.navigate([`/partners/${partner.id}`]);
    
  }
}
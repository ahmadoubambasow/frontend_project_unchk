import {
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

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';
import { Formation } from '../../../models/formation.model';
import { FormationService } from '../../../services/formation';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-formation-details',

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],

  templateUrl:
    './formation-details.html',

  styleUrl:
    './formation-details.scss'
})
export class FormationDetails
implements OnInit {

  formation?: Formation;

  loading = false;

  constructor(

    private route:
      ActivatedRoute,

    private formationService:
      FormationService

  ) {}

  ngOnInit(): void {

    const id = Number(

      this.route.snapshot.paramMap
        .get('id')
    );

    console.log('ID =', id);

    this.loadFormation(id);
  }

  loadFormation(
    id: number
  ): void {

    console.log('Début chargement');

    this.loading = true;

    this.formationService

      .getById(id)

      .subscribe({

        next: (response) => {

          console.log('Réponse reçue', response);
          this.formation =
            response;

          this.loading = false;
        },

        error: (error) => {

          console.error(error);

          this.loading = false;
        }
      });
  }
}
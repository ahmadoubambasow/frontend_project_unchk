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

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';
import { Formation } from '../../../models/formation.model';
import { FormationService } from '../../../services/formation';
import { MatTabsModule } from '@angular/material/tabs';
import { TrainerResponse } from '../../../models/trainer-response.model';
import { FormationTrainerService } from '../../../services/formation-trainer';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AssignTrainerDialog } from '../assign-trainer-dialog/assign-trainer-dialog';
import { ConfirmDialog } from '../../../shared/dialogs/confirm-dialog/confirm-dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formation-details',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule
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

  trainers: TrainerResponse[] = [];

  constructor(

    private route:
      ActivatedRoute,

    private formationService:
      FormationService,
    
    private formationTrainerService: FormationTrainerService,

    private dialog: MatDialog,

    private cdr: ChangeDetectorRef,

    private snackBar: MatSnackBar
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

             console.log('this.formation =', this.formation);
  console.log('typeof =', typeof this.formation);

          this.loadTrainers();

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  loadTrainers(): void {

    if (!this.formation) {

      return;
    }

    this.formationTrainerService.getFormationTrainers(this.formation.id)
      .subscribe({

        next: (response) => {

          this.trainers = response;

          this.cdr.detectChanges();
        },

        error: console.error
      });
  }

  /**
   * Open Assign Trainer Dialog
   */
  openAssignTrainerDialog(): void {

    const dialogRef = this.dialog.open(
      AssignTrainerDialog,

      {
        width: '500px',

        data: this.formation?.id
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {

        if (result) {

          this.loadTrainers();
        }
      }
    )
  }

  /**
   * Annuler Assignation
   */
  removeTrainer(trainer: TrainerResponse): void {

    const dialogref = this.dialog.open(

      ConfirmDialog,

      {
        width: '450px',

        data: {
          title: 'Retirer formateur',
          message: `Retirer ${trainer.fullName} de cette formation ?`,

          confirmText: 'Retirer',

          cancelText: 'Annuler'
        }
      }
    );

    dialogref.afterClosed()
        .subscribe(

          confirmed => {

            if (!confirmed) {
              return;
            } 

            this.formationTrainerService.removeTrainer(this.formation!.id, trainer.id)

                .subscribe({

                  next: () => {

                    this.snackBar.open(

                      'Formateur retiré',

                      'Fermer',

                      {
                        duration: 3000
                      }
                    );

                    this.loadTrainers();
                  },

                  error: console.error
                });
          }
        )
  }
}
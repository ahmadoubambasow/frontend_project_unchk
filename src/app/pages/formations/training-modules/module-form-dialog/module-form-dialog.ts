import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatSnackBar
} from '@angular/material/snack-bar';

import {
  TrainingModule
} from '../../../../models/training-module.model';

import {
  TrainingModuleService
} from '../../../../services/training-module';
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-module-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIcon
],

  templateUrl:
    './module-form-dialog.html',

  styleUrl:
    './module-form-dialog.scss'
})
export class ModuleFormDialog implements OnInit {

  /**
   * Form
   */
  form!: FormGroup;

  /**
   * Loading
   */
  loading = false;

  constructor(

    private fb: 
      FormBuilder,

    private moduleService:
      TrainingModuleService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<ModuleFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data: {

      formationId: number;

      module?: TrainingModule;
    }

  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({

      title: [

        '',

        Validators.required
      ],

      description: [

        ''
      ],

      hours: [

        1,

        [
          Validators.required,
          Validators.min(1)
        ]
      ]
    });

    if (this.data.module) {

      this.form.patchValue({

        title:
          this.data.module.title,

        description:
          this.data.module.description,

        hours:
          this.data.module.hours
      });
    }
  }

  /**
   * Soumettre
   * @returns 
   */
  submit(): void {

    // Valider formulaire
    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    const payload = {

      ...this.form.value,

      formationId:
        this.data.formationId
    };

    // Edition du module
    if (this.data.module) {

      this.moduleService

        .update(

          this.data.module.id,

          payload

        )

        .subscribe({

          next: () => {

            this.loading = false;

            this.snackBar.open(

              'Module modifié',

              'Fermer',

              {
                duration: 3000
              }
            );

            this.dialogRef.close(true);
          },

          error: (error) => {

            console.error(error);

            this.loading = false;
          }
        });

      return;
    }

    // Création du module
    this.moduleService

      .create(payload)

      .subscribe({

        next: () => {

          this.loading = false;

          this.snackBar.open(

            'Module créé',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.dialogRef.close(true);
        },

        error: (error) => {

          console.error(error);

          this.loading = false;
        }
      });
  }
}
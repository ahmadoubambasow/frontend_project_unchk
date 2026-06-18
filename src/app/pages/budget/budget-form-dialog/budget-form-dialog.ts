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
  MatSelectModule
} from '@angular/material/select';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { BudgetService } from '../services/budget';
import { Budget } from '../models/budget.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-budget-form-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],

  templateUrl:
    './budget-form-dialog.html',

  styleUrl:
    './budget-form-dialog.scss'
})
export class BudgetFormDialog
implements OnInit {

  /**
   * Form
   */
  form!: FormGroup;

  /**
   * Loading
   */
  loading = false;

  /**
   * Selected file
   */
  selectedFile?: File;

  /**
   * Variance
   */
  variance = 0;

  /**
   * Budget types
   */
  readonly budgetTypes = [

    'BUDGET_PROJECT',

    'ORIENTATION_NOTE',

    'EXECUTED_BUDGET'
  ];

  constructor(

    private fb:
      FormBuilder,

    private budgetService:
      BudgetService,

    private snackBar:
      MatSnackBar,

    public dialogRef:
      MatDialogRef<BudgetFormDialog>,

    @Inject(MAT_DIALOG_DATA)

    public data?: Budget

  ) {}

  ngOnInit(): void {

    //
    this.buildForm();

    if (this.data) {

      this.patchForm();
    }

    this.watchAmounts();
  }

  /**
   * Build form
   */
  buildForm(): void {

    this.form = this.fb.group({

      year: [
        new Date().getFullYear(),
        Validators.required
      ],

      title: [
        '',
        Validators.required
      ],

      type: [
        'BUDGET_PROJECT',
        Validators.required
      ],

      plannedAmount: [0],

      executedAmount: [0],

      description: [''],

      documentPath: ['']
    });
  }

  /**
   * 
   */
  patchForm(): void {

    this.form.patchValue({

      year:
        this.data?.year,

      title:
        this.data?.title,

      type:
        this.data?.type,

      plannedAmount:
        this.data?.plannedAmount,

      executedAmount:
        this.data?.executedAmount,

      description:
        this.data?.description,

      documentPath:
        this.data?.documentPath
    });

    this.variance =
      this.data?.variance || 0;
  }

  /**
   * Watch amounts
   */
  watchAmounts(): void {

    this.form.valueChanges

      .subscribe(value => {

        const planned =

          Number(
            value.plannedAmount || 0
          );

        const executed =

          Number(
            value.executedAmount || 0
          );

        this.variance =
          executed - planned;
      });
  }

  /**
   * Submit
   */
  submit(): void {

    // Vérification formulaire si invalid
    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    // Création de la requête
    const request =
      this.form.value;

    // Envoi du fichier
    if (this.selectedFile) {

      const formData = new FormData();

      formData.append(
        'file',
        this.selectedFile
      );

      // Envoi de la requête
      this.budgetService

        .uploadFile(formData)

        .subscribe({

          next: response => {

            request.documentPath =
              response.filePath;

            this.saveBudget(
              request
            );
          },

          error: error => {

            console.error(error);

            this.loading = false;
          }
        });

      return;
    }

    this.saveBudget(
      request
    );
  }

  /**
   * Save budget
   * @param request 
   * @returns 
   */
  private saveBudget(
    request: any
  ): void {

    // Mise à jour si id existe
    if (this.data?.id) {

      this.budgetService

        .update(
          this.data.id,
          request
        )

        .subscribe({

          next: () => {

            this.loading = false;

            // Notification
            this.snackBar.open(
              'Budget modifié',
              'Fermer',
              {
                duration: 3000
              }
            );

            this.dialogRef.close(true);
          },

          error: error => {

            console.error(error);

            this.loading = false;
          }
        });

      return;
    }

    // Création de la requête
    this.budgetService

      .create(request)

      .subscribe({

        next: () => {

          this.loading = false;

          // Notification
          this.snackBar.open(
            'Budget créé',
            'Fermer',
            {
              duration: 3000
            }
          );

          this.dialogRef.close(true);
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  /**
   * On file selected
   * @param event 
   */
  onFileSelected(
    event: Event
  ): void {

    // Valeur de l'input
    const input = event.target as HTMLInputElement;

    // Mise à jour du fichier
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  /**
   * Retourne le label du type de document
   * @param type 
   * @returns 
   */
  getTypeLabel(
    type: string
  ): string {

    // Labels
    const labels: Record<string,string> = {

      BUDGET_PROJECT:
        'Projet de budget',

      ORIENTATION_NOTE:
        'Note d’orientation',

      EXECUTED_BUDGET:
        'Budget réalisé'
    };

    return labels[type] || type;
  }
}
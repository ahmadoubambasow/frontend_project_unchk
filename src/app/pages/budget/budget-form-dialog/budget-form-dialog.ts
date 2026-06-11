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

  form!: FormGroup;

  loading = false;

  selectedFile?: File;

  variance = 0;

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

    this.buildForm();

    if (this.data) {

      this.patchForm();
    }

    this.watchAmounts();
  }

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

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    const request =
      this.form.value;

    if (this.selectedFile) {

      const formData = new FormData();

      formData.append(
        'file',
        this.selectedFile
      );

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

  private saveBudget(
    request: any
  ): void {

    if (this.data?.id) {

      this.budgetService

        .update(
          this.data.id,
          request
        )

        .subscribe({

          next: () => {

            this.loading = false;

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

    this.budgetService

      .create(request)

      .subscribe({

        next: () => {

          this.loading = false;

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

  onFileSelected(
    event: Event
  ): void {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  getTypeLabel(
    type: string
  ): string {

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
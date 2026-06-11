import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  MatDialog
} from '@angular/material/dialog';

import {
  MatSnackBar
}
from '@angular/material/snack-bar';

import {
  MatProgressBarModule
} from '@angular/material/progress-bar';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatInputModule
} from '@angular/material/input';
import { Budget } from '../models/budget.model';
import { BudgetService } from '../services/budget';
import { BudgetFormDialog } from '../budget-form-dialog/budget-form-dialog';

@Component({
  selector: 'app-budgets',

  standalone: true,

  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule
  ],

  templateUrl:
    './budgets.html',

  styleUrl:
    './budgets.scss'
})
export class Budgets
implements OnInit {

  budgets: Budget[] = [];

  filteredBudgets: Budget[] = [];

  loading = false;

  totalPlanned = 0;

  totalExecuted = 0;

  totalVariance = 0;

  constructor(

    private budgetService:
      BudgetService,

    private dialog:
      MatDialog,

    private snackBar:
      MatSnackBar,

    private router:
      Router,

    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.loadBudgets();
  }

  loadBudgets(): void {

    this.loading = true;

    this.budgetService

      .getAll()

      .subscribe({

        next: response => {

          this.budgets = response;

          this.filteredBudgets = response;

          this.calculateStats();

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  calculateStats(): void {

    this.totalPlanned =

      this.budgets.reduce(

        (sum, budget) =>

          sum + (budget.plannedAmount || 0),

        0
      );

    this.totalExecuted =

      this.budgets.reduce(

        (sum, budget) =>

          sum + (budget.executedAmount || 0),

        0
      );

    this.totalVariance =

      this.totalExecuted -
      this.totalPlanned;
  }

  applyFilter(
    event: Event
  ): void {

    const value = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredBudgets =

      this.budgets.filter(

        budget =>

          budget.title
            ?.toLowerCase()
            .includes(value)

          ||

          budget.year
            ?.toString()
            .includes(value)
      );
  }

  openCreateDialog(): void {

    const dialogRef =

      this.dialog.open(

        BudgetFormDialog,

        {
          width: '900px',
          maxWidth: '95vw'
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadBudgets();
        }
      });
  }

  openEditDialog(
    budget: Budget
  ): void {

    const dialogRef =

      this.dialog.open(

        BudgetFormDialog,

        {
          width: '900px',
          maxWidth: '95vw',

          data: budget
        }
      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.loadBudgets();
        }
      });
  }

  openDetails(
    budget: Budget
  ): void {

    this.router.navigate([
      '/budgets',
      budget.id
    ]);
  }

  deleteBudget(
    budget: Budget
  ): void {

    if (

      !confirm(
        'Supprimer ce budget ?'
      )

    ) {

      return;
    }

    this.budgetService

      .delete(
        budget.id
      )

      .subscribe({

        next: () => {

          this.snackBar.open(

            'Budget supprimé',

            'Fermer',

            {
              duration: 3000
            }
          );

          this.loadBudgets();
        }
      });
  }

  getTypeLabel(
    type: string
  ): string {

    const labels: Record<string,string> = {

      BUDGET_PROJECT:
        'Projet budget',

      ORIENTATION_NOTE:
        'Note orientation',

      EXECUTED_BUDGET:
        'Budget réalisé'
    };

    return labels[type] || type;
  }
}
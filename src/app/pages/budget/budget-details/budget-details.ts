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
import { Budget } from '../models/budget.model';
import { BudgetService } from '../services/budget';
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-budget-details',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatIcon
],

  templateUrl:
    './budget-details.html',

  styleUrl:
    './budget-details.scss'
})
export class BudgetDetails
implements OnInit {

  budget?: Budget;

  loading = false;

  constructor(

    private route:
      ActivatedRoute,

    private budgetService:
      BudgetService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    const id = Number(

      this.route.snapshot
        .paramMap
        .get('id')
    );

    this.loadBudget(id);
  }

  loadBudget(
    id: number
  ): void {

    this.loading = true;

    this.budgetService

      .getById(id)

      .subscribe({

        next: response => {

          this.budget = response;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  getTypeLabel(
    type?: string
  ): string {

    const labels: Record<string,string> = {

      BUDGET_PROJECT:
        'Projet de budget',

      ORIENTATION_NOTE:
        'Note d’orientation',

      EXECUTED_BUDGET:
        'Budget réalisé'
    };

    return labels[type || '']
      || '-';
  }

  isImage(
  path?: string
): boolean {

  if (!path) {

    return false;
  }

  const extension =

    path
      .split('.')
      .pop()
      ?.toLowerCase();

  return [

    'jpg',
    'jpeg',
    'png',
    'webp'

  ].includes(
    extension || ''
  );
}

openDocument(
  filePath: string
): void {

  window.open(
    `http://localhost:8080/uploads/documents/${filePath}`,
    '_blank'
  );

  }
}
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';
import { InsertionDashboardService } from '../services/insertion-dashboard';
import { InsertionDashboard } from '../models/insertion-dashboard.model';

@Component({
  selector: 'app-insertion-dashboard',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './insertion-dashboard.html',

  styleUrl:
    './insertion-dashboard.scss'
})
export class InsertionDashboardPage implements OnInit {

  /**
   * Dashboard
   */
  dashboard?: InsertionDashboard;

  constructor(

    private dashboardService:
      InsertionDashboardService,

    private cdr: 
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.dashboardService

      .getDashboard()

      .subscribe({

        next: response => {

          this.dashboard = response;

          this.cdr.detectChanges();
        }
      });
  }
}
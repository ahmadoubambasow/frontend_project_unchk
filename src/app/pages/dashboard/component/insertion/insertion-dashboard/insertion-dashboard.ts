import { Component, Input } from '@angular/core';
import { DashboardStats } from '../../../../../models/dashboard-stats.model';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-insertion-dashboard',
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './insertion-dashboard.html',
  styleUrl: './insertion-dashboard.scss',
})
export class InsertionDashboard {

  /**
   * Statistiques de l'insertion
   */
  @Input({ required: true })
  dashboard!: DashboardStats;
}

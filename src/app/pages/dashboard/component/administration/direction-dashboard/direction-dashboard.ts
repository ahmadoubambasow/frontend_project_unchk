import { Component, Input } from '@angular/core';
import { DashboardStats } from '../../../../../models/dashboard-stats.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-direction-dashboard',
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './direction-dashboard.html',
  styleUrl: './direction-dashboard.scss',
})
export class DirectionDashboard {

  /**
   * Statistiques du direction
   */
  @Input({ required: true })
  dashboard!: DashboardStats;
}

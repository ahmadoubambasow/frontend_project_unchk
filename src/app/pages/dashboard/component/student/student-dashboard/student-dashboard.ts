import { Component, Input } from '@angular/core';
import { DashboardStats } from '../../../../../models/dashboard-stats.model';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-student-dashboard',
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.scss',
})
export class StudentDashboard {

  /**
   * Statistiques du dashboard des etudiants
   */
  @Input({ required: true })
  dashboard!: DashboardStats;
}

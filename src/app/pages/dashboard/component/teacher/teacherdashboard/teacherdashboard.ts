import { Component, Input } from '@angular/core';
import { DashboardStats } from '../../../../../models/dashboard-stats.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './teacherdashboard.html',
  styleUrl: './teacherdashboard.scss',
})
export class TeacherDashboard {

  /**
   * Statistiques du dashboard des enseignants
   */
  @Input({ required: true })
  dashboard!: DashboardStats;
}

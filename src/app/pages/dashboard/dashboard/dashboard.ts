import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DashboardStats } from '../../../models/dashboard-stats.model';
import { DashboardService } from '../../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  /**
   * Statistiques dashboard
   */
  stats!: DashboardStats;

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {

    this.loadStats();
  }

  /**
   * Chargement statistiques
   */
  loadStats(): void {

    this.dashboardService.getStats().subscribe({

      next: (response) => {

        console.log(response);

        this.stats = response;
      },
      error: (err) => {

        console.error(err);
      }
    });
  }
}

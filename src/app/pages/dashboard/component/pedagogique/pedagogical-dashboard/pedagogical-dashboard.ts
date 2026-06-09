import { Component, Input } from '@angular/core';
import { DashboardStats } from '../../../../../models/dashboard-stats.model';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pedagogical-dashboard',
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './pedagogical-dashboard.html',
  styleUrl: './pedagogical-dashboard.scss',
})
export class PedagogicalDashboard {

  @Input({ required: true })
  dashboard!: DashboardStats;
}

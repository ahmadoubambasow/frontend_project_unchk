import { Component, Input } from '@angular/core';
import { DashboardStats } from '../../../../../models/dashboard-stats.model';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-secretary-dashboard',
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './secretary-dashboard.html',
  styleUrl: './secretary-dashboard.scss',
})
export class SecretaryDashboard {

  @Input({ required: true })
  dashboard!: DashboardStats;
}

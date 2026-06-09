import { Component, Input } from '@angular/core';
import { DashboardStats } from '../../../../../models/dashboard-stats.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './teacherdashboard.html',
  styleUrl: './teacherdashboard.scss',
})
export class TeacherDashboard {

  @Input({ required: true })
  dashboard!: DashboardStats;
}

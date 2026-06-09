import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminDashboardComponent } from '../component/admin/admin-dashboard/admin-dashboard';
import { DirectionDashboard } from '../component/administration/direction-dashboard/direction-dashboard';
import { InsertionDashboard } from '../component/insertion/insertion-dashboard/insertion-dashboard';
import { SecretaryDashboard } from '../component/secretary/secretary-dashboard/secretary-dashboard';
import { StudentDashboard } from '../component/student/student-dashboard/student-dashboard';
import { PedagogicalDashboard } from '../component/pedagogique/pedagogical-dashboard/pedagogical-dashboard';
import { TeacherDashboard } from '../component/teacher/teacherdashboard/teacherdashboard';
import { DashboardStats } from '../../../models/dashboard-stats.model';
import { DashboardService } from '../../../services/dashboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    AdminDashboardComponent,
    DirectionDashboard,
    PedagogicalDashboard,
    InsertionDashboard,
    SecretaryDashboard,
    StudentDashboard,
    TeacherDashboard
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  /**
   * Loading
   */
  loading = false;

  /**
   * Dashboard
   */
  dashboard!: DashboardStats;

  /**
   * Constructor
   */
  constructor(

    private dashboardService:
      DashboardService,

    private cdr: 
      ChangeDetectorRef
  ) {}

  ngOnInit(): void {
      
    this.loadDashboard();
  }

  /**
   * Load dashboard
   */
  loadDashboard() {

    this.loading = true;

    this.dashboardService.getDashboard().subscribe({

      next: (response) => {

        console.log("response :", response);

        this.dashboard = response;

        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (error) => {

        console.error(error);
      }
    })
  }

}

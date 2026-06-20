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
import { ReportService } from '../../../services/report-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    TeacherDashboard,
    MatButtonModule,
    MatIconModule
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

    private reportService:
      ReportService,

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

        console.log(response);

        this.dashboard = response;

        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (error) => {

        console.error(error);
      }
    })
  }

  /**
   * Download PDF
   */
  downloadPdf() {

    this.reportService.exportDashboardPdf().subscribe({

      next: (blob) => {

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');

        link.href = url;

        link.download = 'dashboard.pdf';

        link.click();

        window.URL.revokeObjectURL(url);
      }
    });
  }

  /**
   * Download Excel
   */
  downloadExcel() {

    this.reportService.exportDashboardExcel().subscribe({

      next: (blob) => {

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');

        link.href = url;

        link.download = 'dashboard.xlsx';

        link.click();

        window.URL.revokeObjectURL(url);
      }
    });
  }

}

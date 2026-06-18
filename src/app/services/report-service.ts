import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {

  /**
   * Api URL
   */
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(

    private http: HttpClient

  ) {}

  /**
   * Export dashboard pdf
   */
  exportDashboardPdf(): Observable<Blob> {

    return this.http.get(`${this.apiUrl}/dashboard/pdf`, { responseType: 'blob' });
  }

  /**
   * Export dashboard excel
   */
  exportDashboardExcel(): Observable<Blob> {

    return this.http.get(`${this.apiUrl}/dashboard/excel`, { responseType: 'blob' });
  }
}

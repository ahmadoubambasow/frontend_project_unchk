import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardStats } from '../models/dashboard-stats.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private apiUrl = environment.apiUrl + 'dashboard';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Retourne statistiques
   */
  getDashboard(): Observable<DashboardStats> {
   
    return this.http.get<DashboardStats>(`${this.apiUrl}`);
  }
}

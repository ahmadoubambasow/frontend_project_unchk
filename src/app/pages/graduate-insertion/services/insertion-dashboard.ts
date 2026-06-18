import { Injectable } from '@angular/core';
import { InsertionDashboard } from '../models/insertion-dashboard.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsertionDashboardService {

  /**
   * URL de l'API
   */
  private apiUrl =
    'http://localhost:8080/api/insertion-dashboard';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupérer le dashboard
   * @returns 
   */
  getDashboard() {

    return this.http.get<InsertionDashboard>(
      this.apiUrl
    );
  }
}
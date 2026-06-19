import { Injectable } from '@angular/core';
import { InsertionDashboard } from '../models/insertion-dashboard.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsertionDashboardService {

  /**
   * URL de l'API
   */
  private apiUrl =
    environment.apiUrl + 'insertion-dashboard';

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
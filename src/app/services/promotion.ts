import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion } from '../models/promotion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {

  /**
   * API URL
   */
  private apiUrl = 'http://localhost:8080/api/promotions';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Liste des promotions
   */
  getPromotions(): Observable<Promotion[]> {

    return this.http.get<Promotion[]>(this.apiUrl);
  }

  /**
   * Créer une promotion
   */
  createPromotion(promotion: any): Observable<Promotion> {
    return this.http.post<Promotion>(this.apiUrl, promotion);
  }

  /**
   * Update
   */
  updatePromotion(id: number, promotion: any): Observable<Promotion> {
    return this.http.put<Promotion>(`${this.apiUrl}/${id}`, promotion);
  }

  /**
   * Suppression
   */
  deletePromotion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

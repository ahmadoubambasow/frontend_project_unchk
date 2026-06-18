import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {

  /**
   * API URL
   */
  private apiUrl = environment.apiUrl + 'formation-trainers';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Liste formateurs
   */
  getTrainers(): Observable<Trainer[]> {

    return this.http.get<Trainer[]>(this.apiUrl);
  }

  /**
   * Création formateur
   */
  createTrainer(request: Trainer): Observable<Trainer> {

    return this.http.post<Trainer>(this.apiUrl, request);
  }

  /**
   * Mise à jour formateur
   */
  updateTrainer(id: number, request: any): Observable<Trainer> {

    return this.http.put<Trainer>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Suppression formateur
   */
  deleteTrainer(id: number): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

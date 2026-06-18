import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormationTrainerService {

  /**
   * API URL
   */
  private apiUrl = environment.apiUrl + 'formation-trainers';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Assigner une formation au formateur
   */
  assignTrainer(formationId: number, trainerId: number): Observable<void> {

    return this.http.post<void>(
      this.apiUrl,
      { formationId, trainerId }
    );
  }

  /**
   * Récuperer les formations d'un formateur
   */
  getFormationTrainers(formationId: number) {

    return this.http.get<any[]>(
      `${this.apiUrl}/${formationId}`
    );
  }

  /**
   * Dissocier une formation au trainer
   */
  removeTrainer(formationId: number, trainerId: number) {

    return this.http.delete(
      `${this.apiUrl}/${formationId}/${trainerId}`
    );
  }
}

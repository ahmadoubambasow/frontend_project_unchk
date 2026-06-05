import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingModule } from '../models/training-module.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingModuleService {

  /**
   * API URL
   */
  private apiUrl = 'http://localhost:8080/api/training-modules';

  constructor(
    private http: HttpClient
  ) {}

  getModules():
    Observable<TrainingModule[]> {

      return this.http.get<TrainingModule[]>(

        this.apiUrl
      );
  }

  getByFormation(
    formationId: number
  ): Observable<TrainingModule[]> {

    return this.http.get<TrainingModule[]>(

      `${this.apiUrl}/formation/${formationId}`
    );
  }

  create(
    request: any
  ): Observable<TrainingModule> {

    return this.http.post<TrainingModule>(
      this.apiUrl,
      request
    );
  }

  update(
    id: number,
    request: any
  ): Observable<TrainingModule> {

    return this.http.put<TrainingModule>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  delete(
    id: number
  ) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}

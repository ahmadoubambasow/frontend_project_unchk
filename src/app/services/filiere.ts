import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filiere } from '../models/filiere.model';
import { FiliereRequest } from '../models/filiere-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FiliereService {

  /**
   * API URL
   */
  private apiUrl = environment.apiUrl + 'filieres';

  constructor(
    private http: HttpClient
  ) {}

  getFilieres():
    Observable<Filiere[]> {

    return this.http.get<Filiere[]>(
      this.apiUrl
    );
  }

  createFiliere(
    request: FiliereRequest
  ): Observable<Filiere> {

    return this.http.post<Filiere>(
      this.apiUrl,
      request
    );
  }

  updateFiliere(
    id: number,
    request: FiliereRequest
  ): Observable<Filiere> {

    return this.http.put<Filiere>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  deleteFiliere(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}

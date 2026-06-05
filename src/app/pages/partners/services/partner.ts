import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Partner
} from '../models/partner.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private apiUrl =
    'http://localhost:8080/api/partners';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Partner[]> {

    return this.http.get<Partner[]>(
      this.apiUrl
    );
  }

  getById(
    id: number
  ): Observable<Partner> {

    return this.http.get<Partner>(
      `${this.apiUrl}/${id}`
    );
  }

  create(
    request: any
  ): Observable<Partner> {

    return this.http.post<Partner>(
      this.apiUrl,
      request
    );
  }

  update(
    id: number,
    request: any
  ): Observable<Partner> {

    return this.http.put<Partner>(
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
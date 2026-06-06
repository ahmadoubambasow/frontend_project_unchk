import {
  HttpClient
} from '@angular/common/http';

import {
  Injectable
} from '@angular/core';

import {
  Observable
} from 'rxjs';

import {
  GraduateInsertion
} from '../models/graduate-insertion.model';

@Injectable({
  providedIn: 'root'
})
export class GraduateInsertionService {

  private apiUrl =
    'http://localhost:8080/api/graduate-insertions';

  constructor(
    private http: HttpClient
  ) {}

  getAll():
    Observable<GraduateInsertion[]> {

    return this.http.get<GraduateInsertion[]>(
      this.apiUrl
    );
  }

  getById(
    id: number
  ): Observable<GraduateInsertion> {

    return this.http.get<GraduateInsertion>(
      `${this.apiUrl}/${id}`
    );
  }

  create(
    request: any
  ) {

    return this.http.post(
      this.apiUrl,
      request
    );
  }

  update(
    id: number,
    request: any
  ) {

    return this.http.put(
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
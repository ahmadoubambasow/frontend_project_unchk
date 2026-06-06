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
  Budget
} from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private apiUrl =
    'http://localhost:8080/api/budgets';

  constructor(
    private http: HttpClient
  ) {}

  getAll():
    Observable<Budget[]> {

    return this.http.get<Budget[]>(
      this.apiUrl
    );
  }

  getById(
    id: number
  ): Observable<Budget> {

    return this.http.get<Budget>(
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

  uploadFile(
    formData: FormData
  ) {

    return this.http.post<{filePath:string}>(
      `${this.apiUrl}/upload`,
      formData
    );
  }
}
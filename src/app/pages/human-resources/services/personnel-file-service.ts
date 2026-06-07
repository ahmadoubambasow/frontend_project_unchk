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
  PersonnelFile
} from '../models/personnel-file.model';

@Injectable({
  providedIn: 'root'
})
export class PersonnelFileService {

  private apiUrl =
    'http://localhost:8080/api/personnel-files';

  constructor(
    private http: HttpClient
  ) {}

  getAll():
    Observable<PersonnelFile[]> {

    return this.http.get<PersonnelFile[]>(
      this.apiUrl
    );
  }

  getById(
    id: number
  ): Observable<PersonnelFile> {

    return this.http.get<PersonnelFile>(
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

    return this.http.post<{
      filePath: string;
    }>(
      `${this.apiUrl}/upload`,
      formData
    );
  }
}
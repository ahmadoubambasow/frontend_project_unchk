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
  StudentFile
} from '../models/student-file.model';

@Injectable({
  providedIn: 'root'
})
export class StudentFileService {

  private apiUrl =
    'http://localhost:8080/api/student-files';

  constructor(
    private http: HttpClient
  ) {}

  getAll():
    Observable<StudentFile[]> {

    return this.http.get<StudentFile[]>(
      this.apiUrl
    );
  }

  getById(
    id: number
  ): Observable<StudentFile> {

    return this.http.get<StudentFile>(
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
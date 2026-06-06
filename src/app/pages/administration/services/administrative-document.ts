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
  AdministrativeDocument
} from '../models/administrative-document.model';

@Injectable({
  providedIn: 'root'
})
export class AdministrativeDocumentService {

  private apiUrl =
    'http://localhost:8080/api/administrative-documents';

  constructor(
    private http: HttpClient
  ) {}

  getAll():
    Observable<AdministrativeDocument[]> {

    return this.http.get<AdministrativeDocument[]>(
      this.apiUrl
    );
  }

  getById(
    id: number
  ): Observable<AdministrativeDocument> {

    return this.http.get<AdministrativeDocument>(
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

  uploadFile(formData: FormData) {
     return this.http.post<{filePath:string}>(
       `${this.apiUrl}/upload`,
       formData       
     )
  }

  getMyDocuments() {

  return this.http.get<
    AdministrativeDocument[]
  >(
    `${this.apiUrl}/my-documents`
  );
}
}
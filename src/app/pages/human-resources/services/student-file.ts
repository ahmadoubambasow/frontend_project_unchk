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

  /**
   * API URL
   */
  private apiUrl =
    'http://localhost:8080/api/student-files';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupérer tous les dossiers
   * @returns 
   */
  getAll():
    Observable<StudentFile[]> {

    return this.http.get<StudentFile[]>(
      this.apiUrl
    );
  }

  /**
   * Récupérer un dossier
   */
  getById(
    id: number
  ): Observable<StudentFile> {

    return this.http.get<StudentFile>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Création d'un dossier
   */
  create(
    request: any
  ) {

    return this.http.post(
      this.apiUrl,
      request
    );
  }

  /**
   * Mise à jour d'un dossier
   * @param id 
   * @param request 
   * @returns 
   */
  update(
    id: number,
    request: any
  ) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  /**
   * Suppression d'un dossier
   */
  delete(
    id: number
  ) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Chargement du fichier
   * @param formData 
   * @returns 
   */
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
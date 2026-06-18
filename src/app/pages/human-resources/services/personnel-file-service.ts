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

  /**
   * URL de l'API
   */
  private apiUrl =
    'http://localhost:8080/api/personnel-files';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupérer tous les dossiers
   * @returns 
   */
  getAll():
    Observable<PersonnelFile[]> {

    return this.http.get<PersonnelFile[]>(
      this.apiUrl
    );
  }

  /**
   * Récupérer un dossier
   * @param id 
   * @returns 
   */
  getById(
    id: number
  ): Observable<PersonnelFile> {

    return this.http.get<PersonnelFile>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Création d'un dossier
   * @param request 
   * @returns 
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
   * @param id 
   * @returns 
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
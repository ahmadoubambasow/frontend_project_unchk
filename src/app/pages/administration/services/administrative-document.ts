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
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministrativeDocumentService {

  /**
   * URL de l'API
   */
  private apiUrl =
    environment.apiUrl + 'administrative-documents';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupère tous les documents
   */
  getAll():
    Observable<AdministrativeDocument[]> {

    return this.http.get<AdministrativeDocument[]>(
      this.apiUrl
    );
  }

  /**
   * Récupère un document
   */
  getById(
    id: number
  ): Observable<AdministrativeDocument> {

    return this.http.get<AdministrativeDocument>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Création d'un document
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
   * Mise à jour d'un document
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
   * Suppression d'un document
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
  uploadFile(formData: FormData) {
     return this.http.post<{filePath:string}>(
       `${this.apiUrl}/upload`,
       formData       
     )
  }

  /**
   * Récupérer mes documents
   * @returns 
   */
  getMyDocuments() {

    return this.http.get<
      AdministrativeDocument[]
    >(
      `${this.apiUrl}/my-documents`
    );
  }
}
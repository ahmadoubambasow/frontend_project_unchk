import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Communication } from '../models/communication.model';
import { Observable } from 'rxjs';
import { CommunicationRequest } from '../models/communication-request.model';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {

  /**
   * API URL
   */
  private apiUrl = 'http://localhost:8080/api/communications';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Retourne la liste des communications
   */
  getCommunications(): Observable<Communication[]> {

    return this.http.get<Communication[]>(this.apiUrl);
  } 

  /**
   * Créer une communication
   */
  createCommunication(request: CommunicationRequest): Observable<Communication> {

    return this.http.post<Communication>(this.apiUrl, request);
  }

  /**
   * Modifier une communication
   */
  updateCommunication(id: number, request: CommunicationRequest): Observable<Communication> {

    return this.http.put<Communication>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Supprimer une communication
   */
  deleteCommunication(id: number): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadFile(file: File) {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(
      'http://localhost:8080/api/files/upload',
      formData,
      {
        responseType: 'text'
      }
    );
  }

  /**
   * Archives
   */
  getArchives(): Observable<Communication[]> {

    return this.http.get<Communication[]>(`${this.apiUrl}/archives`);
  }

  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Communication } from '../models/communication.model';
import { Observable } from 'rxjs';
import { CommunicationRequest } from '../models/communication-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {

  /**
   * API URL
   */
  private apiUrl = environment.apiUrl + '/communications';

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

  /**
   * Upload file
   * @param file 
   * @returns 
   */
  uploadFile(file: File) {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(
      environment.apiUrl + 'files/upload',
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

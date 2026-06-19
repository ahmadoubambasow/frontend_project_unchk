import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import { User } from '../models/user.model';

import { UserRequest } from '../models/user-request.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * URL de l'API
   */
  private apiUrl =
    environment.apiUrl + 'users';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupérer tous les utilisateurs
   * @returns 
   */
  getUsers():
    Observable<User[]> {

    return this.http.get<User[]>(
      this.apiUrl
    );
  }

  /**
   * Récupérer tous les rôles
   * @returns 
   */
  getRoles():
    Observable<string[]> {

    return this.http.get<string[]>(
      `${this.apiUrl}/roles`
    );
  }

  /**
   * Créer un utilisateur
   * @param request 
   * @returns 
   */
  createUser(
    request: UserRequest
  ): Observable<User> {

    return this.http.post<User>(
      this.apiUrl,
      request
    );
  }

  /**
   * Modifier un utilisateur
   * @param id 
   * @param request 
   * @returns 
   */
  updateUser(

    id: number,

    request: UserRequest

  ): Observable<User> {

    return this.http.put<User>(

      `${this.apiUrl}/${id}`,

      request
    );
  }

  /**
   * Delete un utilisateur
   * @param id 
   * @returns 
   */
  deleteUser(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Récupérer mon profil
   * @returns 
   */
  getProfile(): Observable<User> {

    return this.http.get<User>(
      `${this.apiUrl}/profile`
    );
  }

  /**
   * Modifier mon profil
   * @param request 
   * @returns 
   */
  updateProfile(
    request: UserRequest
  ): Observable<User> {

    return this.http.put<User>(
      `${this.apiUrl}/profile`,
      request
    );
  }

  /**
   * Récupérer tous les trainers
   * @returns 
   */
  getTrainers() {

    return this.http.get<any[]>(
      `${this.apiUrl}/trainers`)
  }

  /**
   * Récupérer tous les étudiants
   */
  getStudents(): Observable<User[]> {

    return this.http.get<User[]>(
      `${this.apiUrl}/students`)
  }
}
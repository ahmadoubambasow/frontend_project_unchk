import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /**
   * URL de l'API
   */
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor( private http: HttpClient) {}

  /**
   * Connexion utilisateur
   * 
   * @param request données login
   * @return réponse backend
   */
  login(request: LoginRequest): Observable<any> {

    return this.http.post(`${this.apiUrl}/login`, request);
  }

  /**
   * Sauvegarde JWT
   * 
   * @param token JWT token
   */
  saveToken(token: string): void {

    localStorage.setItem('token', token);
  }

  /**
   * Récupère JWT
   */
  getToken(): string | null {

    return localStorage.getItem('token');
  }

  /**
   * Vérifie si utilisateur connecté
   */
  isLoggedIn(): boolean {

    return !!this.getToken();
  }

  /**
   * Déconnexion utilisateur
   */
  logout(): void {

    localStorage.removeItem('token');
  }
}

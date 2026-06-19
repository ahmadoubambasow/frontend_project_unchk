import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /**
   * Utilisateur connecté
   */
  private currentUserSubject =
  new BehaviorSubject<LoginResponse | null>(
    this.getUser()
  );

  /**
   * Observateur utilisateur connecté
   */
  currentUser$ =
    this.currentUserSubject.asObservable();

  /**
   * URL de l'API
   */
  private apiUrl = environment.apiUrl + 'auth';

  /**
   * Helper JWT
   */
  private jwtHelper = new JwtHelperService();

  constructor( private http: HttpClient) {}

  /**
   * Connexion utilisateur
   * 
   * @param request données login
   * @return réponse backend
   */
  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request);
  }

  /**
   * Sauvegarde utilisateur connecté
   */
  saveUser(user: LoginResponse): void {

    localStorage.setItem('user', JSON.stringify(user));

    if (user.role) {
      localStorage.setItem('role', user.role);
    }

    this.currentUserSubject.next(user);
  }

  /**
   * Retourne utilisateur connecté
   */
  getUser(): LoginResponse | null {

    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
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

    // Recupération token
    const token = localStorage.getItem('token');

    // Vérifie si token existant
    if (!token) {

      return false;
    }

    // Vérifie si token expiré
    if (this.jwtHelper.isTokenExpired(token)) {
      
      localStorage.removeItem('token');

      return false;
    }

    return true;
  }

  /**
   * Déconnexion utilisateur
   */
  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    localStorage.removeItem('role');

    this.currentUserSubject.next(null);
  }

  /**
   * Retourne utilisateur connecté
   */
  getCurrentUser() {

    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }


  /**
   * Mise à jour utilisateur connecté
   * @param updatedUser 
   * @returns 
   */
  updateCurrentUser(
    updatedUser: any
  ): void {

    const currentUser =
      this.getCurrentUser();

    if (!currentUser) {
      return;
    }

    const mergedUser = {

      ...currentUser,

      fullName:
        updatedUser.fullName,

      email:
        updatedUser.email
    };

    localStorage.setItem(
      'user',
      JSON.stringify(mergedUser)
    );

    this.currentUserSubject.next(
      mergedUser
    );
  }

  /**
   * Role
   */

  hasAnyRole(roles: string[]): boolean {

    const role = localStorage.getItem('role');

    console.log('role user:', role);
    console.log('roles auorisés:', roles);
    return !!role && roles.includes(role);
  }
}

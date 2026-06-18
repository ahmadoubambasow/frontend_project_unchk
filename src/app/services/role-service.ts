import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Role } from '../models/role.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  /**
   * URL de l'api
   */
  private apiUrl =
    environment.apiUrl + 'roles';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Récupérer tous les rôles
   * @returns 
   */
  getRoles():
    Observable<Role[]> {

    return this.http.get<Role[]>(
      this.apiUrl
    );
  }
}
import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import { User } from '../models/user.model';

import { UserRequest } from '../models/user-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl =
    'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient
  ) {}

  getUsers():
    Observable<User[]> {

    return this.http.get<User[]>(
      this.apiUrl
    );
  }

  getRoles():
    Observable<string[]> {

    return this.http.get<string[]>(
      `${this.apiUrl}/roles`
    );
  }

  createUser(
    request: UserRequest
  ): Observable<User> {

    return this.http.post<User>(
      this.apiUrl,
      request
    );
  }

  updateUser(

    id: number,

    request: UserRequest

  ): Observable<User> {

    return this.http.put<User>(

      `${this.apiUrl}/${id}`,

      request
    );
  }

  deleteUser(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  getTrainers() {

    return this.http.get<any[]>(
      `${this.apiUrl}/trainers`)
  }
}
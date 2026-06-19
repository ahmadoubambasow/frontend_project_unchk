import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  /**
   * Recupération des services
   */

  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifie si utilisateur connecté
  const token = authService.getToken();

  // Ajout token si connecté
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  // Envoi requête
  return next(authReq).pipe(

    // Gestion erreur
    catchError((error: HttpErrorResponse) => {

      // Vérifie si erreur 401
      if (error.status === 401) {

        localStorage.clear();

        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
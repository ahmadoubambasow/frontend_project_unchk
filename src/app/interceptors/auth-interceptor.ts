import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService);

  // Récupération token
  const token = authService.getToken();

  // Si token existe
  if (token) {
    
    // CLone requete avec header
    const clonedRequest = req.clone({

      setHeaders: {

        Authorization: `Bearer ${token}`
      }
    });

    return next(clonedRequest);
  }

  // Sinon requete normale
  return next(req);
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);

  const router = inject(Router);

  // Vérifie connexion
  if (authService.isLoggedIn()) {

    return true;
  }

  // Sinon redirection Login
  router.navigate(['login']);
  
  return false;
};

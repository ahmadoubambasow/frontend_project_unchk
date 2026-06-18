import { inject } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth';


export const roleGuard: CanActivateFn = (

  route: ActivatedRouteSnapshot

) => {

  // Recupération des services

  const authService = inject(AuthService);

  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[];

  const currentUser = authService.getCurrentUser();

  // Vérifie si utilisateur connecté 
  if (!currentUser) {

    router.navigate(['/login']);

    return false;
  }

  // Vérifie si utilisateur autorisé
  if (!allowedRoles || allowedRoles.length === 0) {

    return true;

  }

  // Vérifie si role autorisé
  if (allowedRoles.includes(currentUser.role)) {

    return true;
  }

  // Sinon redirection dashboard
  router.navigate(['/dashboard']);

  return false;
};
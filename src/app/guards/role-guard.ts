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

  const authService = inject(AuthService);

  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[];

  const currentUser = authService.getCurrentUser();

  if (

    !currentUser

  ) {

    router.navigate(['/login']);

    return false;
  }

  if (!allowedRoles || allowedRoles.length === 0) {

    return true;

  }

  if (

    allowedRoles.includes(
      currentUser.role
    )

  ) {

    return true;
  }

  router.navigate(['/dashboard']);

  return false;
};
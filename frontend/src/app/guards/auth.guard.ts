import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import  TokenService  from '../services/auth-service/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);

  if (!tokenService.isAuthenticated()) {
    console.log('Access denied. User is not authenticated.');
    return false;
  }

  const requiredRole = route.data['role'];
  if (requiredRole && !tokenService.hasRole(requiredRole)) {
    console.log(`Access denied. User does not have the required role: ${requiredRole}`);
    return false;
  }

  return true;
};

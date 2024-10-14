import { inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { query } from 'express';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) : boolean => {

  let authService = inject(AuthService);
  const router = inject(Router);
  const  isLog = authService.getToken();
  if(isLog){
    return true;
  }
  router.navigate(['/login']);
  return false;
};

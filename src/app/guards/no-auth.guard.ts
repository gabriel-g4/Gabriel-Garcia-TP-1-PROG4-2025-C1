import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, filter, take, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.sessionLoaded$.pipe(
    filter(loaded => loaded),
    take(1),
    switchMap(() => authService.session$.pipe(
      take(1),
      map(session => {
        if (session) {
          router.navigate(['/']); // Redirige al home o donde quieras
          return false;
        } else {
          return true;
        }
      })
    ))
  );
};
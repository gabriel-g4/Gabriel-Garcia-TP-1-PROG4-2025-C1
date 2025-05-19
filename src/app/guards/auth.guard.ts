import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { switchMap, filter, map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.sessionLoaded$.pipe(
    filter(loaded => loaded), // Esperamos hasta que esté cargado
    take(1),
    switchMap(() => authService.session$.pipe(
      take(1),
      map(session => {
        if (session) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      })
    ))
  );
};
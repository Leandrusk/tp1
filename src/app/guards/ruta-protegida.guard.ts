import { CanActivateFn } from '@angular/router';

import { inject } from '@angular/core';
 import { AuthService } from '../modules/autentificacion/service/auth.service';
 import { Router } from '@angular/router';

 import{ map,switchMap, of, from} from 'rxjs'
export const rutaProtegidaGuard: CanActivateFn = (route, state) => {

//inyectamos servicio de autentificacion
  const servicioAuth = inject (AuthService);

  //inyectamos servicio de rutas
  const servicioRutas = inject(Router);

  //Especificamos el rol esperado en el guardian
  const rolEsperado = 'admin';
  return true;
};

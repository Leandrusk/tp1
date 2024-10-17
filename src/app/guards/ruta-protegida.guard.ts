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
 return from (servicioAuth.obtenerUid()).pipe(switchMap(uid =>{
  if (uid){
    return servicioAuth.obtenerRol(uid).pipe(
      map (rol =>{
        if (rol=== rolEsperado){
          console.log("usuario verificado como admin");
          return true;

        }else{
          return  false;
        }
      })
    )
  }else{
    //si no hay uid, el usuario no está logueado
    console.log("usuario no verificado, permisos insuficientes");
    //redirecciona al login si el usuario no es admin
    return of(servicioRutas.createUrlTree(["/inicio"]))

  }
 }))
};

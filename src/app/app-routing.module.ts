import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';

//guardian para la ruta de administrador
import { rutaProtegidaGuard } from './guards/ruta-protegida.guard';

// Son las encargadas de tener todas las rutas de la página
const routes: Routes = [
  // Ruta común -> 1 solo componente
  {
    path:"",component:InicioComponent
  },
  // Carga perezosa -> 1 módulo
  // loadChildren: indica una ruta hija
  // ()=>import: ruta de dónde viene el módulo
  // .then: promesa/ función asincronica
  {
    path:"",loadChildren:()=>import('./modules/inicio/inicio.module').then(m=>m.InicioModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/producto/producto.module').then(m=>m.ProductoModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/autentificacion/autentificacion.module').then(m=>m.AutentificacionModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule),
    canActivate: [rutaProtegidaGuard], data: { role: 'admin'}  // Si se cumple la condición, se activa el guardian, especificamos que la ruta va a ser protegida por un guardian 
    // data: { role: 'admin' }: El guardian espera un objeto con la clave 'role' que tenga el valor 'admin' para permitir la entrada a la ruta
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

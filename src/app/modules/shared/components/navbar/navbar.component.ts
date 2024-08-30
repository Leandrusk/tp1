import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/autentificacion/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logueado= true; //variable piola para el boton de registro de sesion 
  deslogueado= false; // variable piola para cerrar sesion
  constructor (
    public servicioAuth: AuthService,
    public servicioRutas: Router
  ){}

  //Cambia los valores de logueado y deslogueado para ocultar los primeros y mostrar el ultimo
  iniciar(){
    this.logueado = false;
    this.deslogueado = true;
  }
  cerrarSesion(){
    this.deslogueado = false;
    //va a eliminar el "token" actual del usuario
    //token: estado actual del usuario en el navegador para mantener la sesion abierta
    this.servicioAuth.cerrarSesion();

    this.servicioRutas.navigate(['/']); //redirigimos a la raiz de la pagina
    this.logueado= true
  }

  /* Funcion para cambiar fondo a modo oscuro */

  cambiarFondo(){
    let toggle: HTMLInputElement | null = document.getElementById('toggle') as HTMLInputElement
    let label_toggle: HTMLElement | null = document.getElementById('label_toggle') as HTMLElement
    if (toggle){
      let checked: boolean = toggle.checked;
      document.body.classList.toggle('dark',checked)
      if(checked){
        label_toggle!.innerHTML = '<i class="fa-solid fa-sun"></i>'
      }else{
        label_toggle!.innerHTML = '<i class="fa-solid fa-moon"></i>'
      }
    }
  }
}

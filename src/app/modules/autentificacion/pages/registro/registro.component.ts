import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
//servicio de autentificacion
import { AuthService } from '../../service/auth.service';
//Servicio de rutas que otorga angular
import { Router } from '@angular/router';

import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';

//importamos la paqueteria de criptacion
import * as CryptoJS from 'crypto-js';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  //esconce la contraseña del input
  hide = true;

  //IMPORTACION DEL MODULO / INTERFAZ
  usuarios: Usuario  ={

    uid: '', // atributos tipo any = reciben valores indefinidos,
    nombre: '',
    apellido:'',
    email: '',
    rol: '',
    password: ''
  }
//referenciamos a nuestros servicios
  constructor(
    public servicioAuth: AuthService,
    public servicioRutas: Router, //metodo de navegacion
    public servicioFireStore: FirestoreService //vincula Uid con la coleccion
  ){

  }

  //CREAR UNA COLECCION QUE SOLO RECIBE OBJETOS DEL TIPO USUARIOS
  coleccionUsuarios: Usuario[] =[];

  //FUNCION PARA EL REGISTRO

   async registrar(){

     /* const credenciales={
    uid: this.usuarios.uid ,
    nombre: this.usuarios.nombre,
    apellido: this.usuarios.apellido,
    password: this.usuarios.password,
    rol: this.usuarios.rol,
    email: this.usuarios.email
    }
    */
    //enviamos los nuevos registros por medio del metodo psuh a la coleccion
    //this.coleccionUsuarios.push(credenciales)
    //console.log(credenciales)
    //console.log(this.coleccionUsuarios)
    //######################### Fin Local

    const credenciales ={
      email: this.usuarios.email,
      password: this.usuarios.password
    }
    //constante "respuesta" = resguarda una respuesta
    const respuesta = await this.servicioAuth.registrar(credenciales.email, credenciales.password)
    .then(respuesta =>{
      Swal.fire({
        title: "bien job!",
        text: "Ha agregado un usuario con exito!",
        icon: "success"
      });

      //Accedemos al servicio de rutas con la flecha metodo navigate
      //metodo NAVIGATE = permite dirigirnos a diferentes vistas
      this.servicioRutas.navigate(['/inicio'])
    })
    //el metodo catch toma una falla y la vuelve un ERROR
    .catch(error=>{
      //cambiar
      alert('Hubo un problema al registrar un nuevo usuario')

      this.LimpiarInputs()
    })
 
    const uid = await this.servicioAuth.obtenerUid();

    this.usuarios.uid = uid

    //ENCRIPTACIN DE KA CONTRASEÑA DE USUARIO
/**
 * ESE SHA es un algoritmo de hashing seguro que toma una entrada (en este caso la contraseña) y produce una cadena de caracteres HEXADECIMAL que representa su HASH
 * 
 * toString() convierte el resultado HASH en una cadenna de caracteres legible
 */
this.usuarios.password = CryptoJS.SHA256(this.usuarios.password).toString();
    //This.guardarusuario() guardaba la info del usuario en la coleccion
    this.GuardarUsuario()

   
}
LimpiarInputs(){
  const inputs = {
    nombre: this.usuarios.nombre = '',
    apellido: this.usuarios.apellido = '',
    password: this.usuarios.password = '',
    rol: this.usuarios.rol = '',
    email: this.usuarios.email=''
  }
}
// funcion para agregar un nuevo usuario
async GuardarUsuario(){
  this.servicioFireStore.agregarUsuario(this.usuarios, this.usuarios.uid)
  .then(res => {
    console.log(this.usuarios);
  })
  .catch(err =>{
    console.log('Error =>', err)
  })
  }
}

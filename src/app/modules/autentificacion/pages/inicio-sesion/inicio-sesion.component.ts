import { Component } from '@angular/core';

import { Usuario } from 'src/app/models/usuario';

import { AuthService } from '../../service/auth.service';

import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';

import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

  //Defino la variable hide
  hide= true
// #########################################Local
  // public usuarioLocal :Usuario[]
//utilizo un constructor para las credenciales correctas
 /* constructor(){
    this.usuarioLocal = [{
      
      uid: '', // atributos tipo any = reciben valores indefinidos,
      nombre: 'Leandro',
      apellido:'carrrasco',
      email: 'Leandrosotocarrasco91@gmail.com',
      rol: 'visitante',
      password: 'Mimosa2005,'
      }]
  }*/

      constructor( 
        public servicioAuth:AuthService,
      public servicioFirestore:FirestoreService,
    public servicioRutas: Router 
  ){}
       
      

  //declaro variables que va a usar el usuario
  usuarios: Usuario  ={

    uid: '', // atributos tipo any = reciben valores indefinidos,
    nombre: '',
    apellido:'',
    email: '',
    rol: '',
    password: ''
  }

    //CREAR UNA COLECCION QUE SOLO RECIBE OBJETOS DEL TIPO USUARIOS
    coleccionUsuarios: Usuario[] =[];
  //creo la funcion de registro que va a utilizar 

  async IniciarSesion(){
    const credenciales ={
      email: this.usuarios.email,
      password: this.usuarios.password
    }

    try{
      //Obtenemos el usuario desde la BD -> Cloud FireStore
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);
      //! -> si es diferente
      // empty -> metodo de firebase para marcar algo si s vacio 
      if(!usuarioBD || usuarioBD.empty){

        alert('Correo electronico no esta registrado')
      this.LimpiarInputs();
      return
      }
/*Primer documento (registro) en la coleccion de usuarios que se obtiene desde la base de datos

*/
      const usuarioDoc = usuarioBD.docs[0];
      /**
       * Extraer los datos del documento en forma de un objeto y se especifica como de tipo
       * 'Usuario' -> haciendo referencia a nuestra interfaz de usuario
       */

      const usuarioData = usuarioDoc.data() as Usuario

      //hash de la contraseña ingresada por el usuario
      const hashPassword = CryptoJS.SHA256(credenciales.password).toString();

      if(hashPassword !== usuarioData.password){
        alert('contraseña incorrecta')
      this.usuarios.password = '';
      return;
      }

    const res = await this.servicioAuth.IniciarSesion(credenciales.email, credenciales.password)
    .then(res=> {
      alert('Se a logueado con exito');
      //almacena el rol del usuario en el servicio de autentificacion
      this.servicioAuth.enviarRolUsuario(usuarioData.rol);

      if(usuarioData.rol === "admin"){
        console.log('inicio de sesion de usuario de admin')
        //si es admin redirecciona a la vista de admin
        this.servicioRutas.navigate(['/admin'])
      }else{
        console.log ('inicio de sesion de usuario de visitante');
        //si es visitante lo redirecciona a la vista de 'inicio'
       this.servicioRutas.navigate(['/inicio'])
      }
      
    })
   
    .catch (err => {
      alert('Hubo un problema al iniciar sesion '+ err);
      this.LimpiarInputs();

    })
    
    }
    catch(error){
      this.LimpiarInputs
    }

  }

  LimpiarInputs(){
    const inputs = {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido = '',
      password: this.usuarios.password = '',
      rol: this.usuarios.rol = '',
      email: this.usuarios.email=''
    }
  }
  // registrar(){
  //   const credenciales={
  //   uid: this.usuarios.uid ,
  //   nombre: this.usuarios.nombre,
  //   apellido: this.usuarios.apellido,
  //   password: this.usuarios.password,
  //   rol: this.usuarios.rol,
  //   email: this.usuarios.email
  //   }

  //   //creo un ciclo que recorra los ingresos de los usuarios 
  //   for (let i = 0; i < this.usuarioLocal.length; i++) {
  //     //Creamos una constante que vamos a utilizar para verificar la informacion
  //     const orden = this.usuarioLocal[i];

  //     //se comparan datos con el if y se verifica si se pudo iniciar sesion
  //     if( orden.email === credenciales.email && orden.password === credenciales.password ){
  //       alert("inicio de sesion")
  //     }
  //     else{
  //       alert("Fallo iniciar sesion")
  //     }
      
  //   }
 /*
      trabajar el inicio de la misma forma que el registro
 usuarios: Usuario  ={
    
    email: '',
  
    password: ''
  }
*/

}

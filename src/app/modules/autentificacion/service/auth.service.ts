import { Injectable } from '@angular/core';
//Servicio de autentificacion de firebase

import { AngularFireAuth} from '@angular/fire/compat/auth';

import { AngularFirestore } from '@angular/fire/compat/firestore';
//observa los cambios
import { Observable } from 'rxjs';
//itera la coleccion leyendo su info actual
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //propiedad privada para el manejo de rol del usuario
  private rolUsuario: string | null = null;



  constructor(
    private auth: AngularFireAuth,
    private servicioFireStore: AngularFirestore
  ) { }

  //funcion para tomar UID
async obtenerUid(){
  //Genera una promesa, y la constante la va a capturar
  const user = await this.auth.currentUser;
//si el usuario no respeta la estructura de la interfaz,
//Si tuvo problemas para el registro- ej: mal internet
  if( user == null){
    return null;
  }
  else{
    return user.uid
  }

}
//funcion para obtener ID

//funcion que busca un usuario en la coleccionde 'usuarios' cuyo correo electronico coincida con el valor proporcionado
 async obtenerUsuario(email:string){
  return this.servicioFireStore.collection("usuarios", ref => ref.where("email", '==', email)).get().toPromise()

}


//Funcion para registro
registrar (email: string, password: string){    


  //retoma nueva info de email y contraseña
  return this.auth.createUserWithEmailAndPassword(email, password);

}
//Funcion para Inicio de sesion
IniciarSesion(email: string, password: string){
  //Validar el email y contraseña
  return this.auth.signInWithEmailAndPassword(email, password );
      

}
  // Función para CERRAR SESIÓN
  cerrarSesion(){
    // Devolver una promesa vacía
    return this.auth.signOut();
  }

  //Función para obtener el rol del usuario actual
  obtenerRol(uid: string): Observable <string | null> {
    //retornamos del servicio de firestore la coleccio ¿n de usuarios, buscando por UID
    //observamos cambios en valores, mapeamos el documento de 'usuario' e identificamos el atributo de rol (aun si este es nulo)

    // y luego extraemos el campo rol, que es el que indica el rol del usuario
    // si el usuario no existe, retornamos null, sino, retornamos el rol del usuario actual.

    return this.servicioFireStore.collection('usuarios').doc(uid).valueChanges()
    .pipe(map((usuario : any) => usuario ? usuario.rol : null))

  }

  //Obtinene el rol de la primera funcion y lo asigna a la propiedad privada local
  enviarRolUsuario (rol:string){
    this.rolUsuario=rol;

  }
  //Función para obtener el rol del usuario actual y retornalo (ya sean alfanumericos o nulos)
  obtenerRolUsuario(): string | null{
    return this.rolUsuario;
  }
}


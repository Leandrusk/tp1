import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  /*
 *Definen una coleccion de usuarios PRIVADA
 *Va a ser una coleccion de firestore
 *respetará la estructura de datos de la interfaz de Usuario
  */
  private usuariosCollection: AngularFirestoreCollection <Usuario>


  constructor(private database: AngularFirestore) { 
    this.usuariosCollection = this.database.collection<Usuario>('usuarios')

  }
  agregarUsuario(usuario: Usuario, id:string){
  // generamos una promesa
    // RESOLVE: promesa resuelta => funciona correctamente
  // Reject: promesa rechaza => ocurrio una falla
    return new Promise(async(resolve,reject) => {
      try{
        usuario.uid =id;
        /**
         * const resultado = coleccion de usuarios, envia como documento el UID 
         * y esta setea la informacion que ingresemos en el registro
         */
        const resultado = await this.usuariosCollection.doc(id).set(usuario);
        resolve(resultado);

      } catch(error){
        reject(error)
      }
    })
  }
}

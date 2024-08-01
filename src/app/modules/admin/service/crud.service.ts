import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //definimos coleccion para los prodctos de la web del tipo producto
  private productoCollection: AngularFirestoreCollection <Producto>

  constructor(private database: AngularFirestore) {
    //referenciamos coleccion de productos y sera subida como 'producto' a firebase
    this.productoCollection = database.collection('producto')
   }
   //CREAR METODO DE PRODUCTOS
   crearProductos(producto: Producto){
    //Una promesa es 
    return new Promise (async(resolve, reject)=> {
      try {
        //CREAMOS NUMERO IDENTIFICATIVO  PARA EL PRODUCTO EN LA BASE DE DATOS
        const idProducto = this.database.createId();
        //ASIGNAMOS ID CREADO AL ATRIBUTO IDPRODUCTO DE LA INTERFAZ 'PRODUCTO'
        producto.idProducto = idProducto

        const resultado = await this.productoCollection.doc(idProducto).set(producto)

        resolve(resultado);
        //TOMA EL ERROR Y LO RECHAZA 
      }catch(error){
        reject(error);

      }
    })
   }
   //OBTENER PRODUCTOS
   //EDITAR PRODUCTOS
   //ELIMINAR PRODUCTOS
}

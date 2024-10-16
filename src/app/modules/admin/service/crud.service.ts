import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
//importaciones para el manejo de archivo y referencias de storage
import {getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject} from 'firebase/storage'

/**
 * getDownloadURL -> para obtener la URL de descarga de una imagen subida
 * getStorage -> para obtener la instancia de almacenamiento
 * ref -> para crear referencias a ubicaciones en el almacenamiento
 * UploadResult -> tipo que representa el resultadonde una operacion subida
 * uploadString -> para subir img en formato cadena
 * deleteObject -> para eliminar un espacio en el almacenamiento  
 */
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //definimos coleccion para los prodctos de la web del tipo producto
  private productoCollection: AngularFirestoreCollection <Producto>

//definimos variable "respuesta" que podrá subir resultados
  private respuesta!: UploadResult;

  //inicializamos servicio de storage
  private storage = getStorage ();

  constructor(private database: AngularFirestore) {
    //referenciamos coleccion de productos y sera subida como 'producto' a firebase
    this.productoCollection = database.collection('producto')
   }

   //CREAR METODO DE PRODUCTOS -> pbtiene datos del formulario y la url de la imagen
   crearProductos(producto: Producto, url: string){
    //Una promesa es 
    return new Promise (async(resolve, reject)=> {
      try {
        //CREAMOS NUMERO IDENTIFICATIVO  PARA EL PRODUCTO EN LA BASE DE DATOS
        const idProducto = this.database.createId();
        //ASIGNAMOS ID CREADO AL ATRIBUTO IDPRODUCTO DE LA INTERFAZ 'PRODUCTO'
        producto.idProducto = idProducto

        //asiganmos URL recibida del parametro al atributo de la iamgen 
        producto.imagen = url;

        const resultado = await this.productoCollection.doc(idProducto).set(producto)

        resolve(resultado);
        //TOMA EL ERROR Y LO RECHAZA 
      }catch(error){
        reject(error);

      }
    })
   }
   //OBTENER PRODUCTOS

   obtenerProducto(){
    //snapshotChanges toma una captura del estado de los datos
    // pipe - funciona como una tuberia que retoma el nuevo arreglo de datos
    //map - "mapea" o recorre esa nueva informacion
    //a - resguarda la nueva informacion y la envia
    return this.productoCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())));
   }
   //EDITAR PRODUCTOSc

   modificarProducto(idProducto: string, nuevaData: Producto){
    //accedemos a la coleccion, buscamos por ID y actualizamos la informacion
    return this.database.collection('producto').doc(idProducto).update(nuevaData);
   }

   //ELIMINAR PRODUCTOS
   eliminarProducto (idProducto: string, imagenUrl: string){
    return new Promise((resolve,reject) => {
      try {
        //definimos referencia local de Storage en el bloque "try"
        const storage = getStorage();

        // Definimos referencia local desde el almacenamient de Storage
        const referenciaImgagen = ref(storage,imagenUrl);

        //Eliminamis ka umg desde el almacenamiento
        deleteObject(referenciaImgagen).then((res)=>{
          //accedo a la coleccion, busco su id y lo elimino
          const respuesta = this.productoCollection.doc(idProducto).delete();
          resolve(respuesta);
        })
        .catch(error => {
          reject('Error al eliminar la imagen: /n '+error)
        })
        //accedo a la coleccion, busco su ID y lo elimino
        const respuesta = this.productoCollection.doc(idProducto).delete();
        resolve(respuesta);
      }
      catch(error){
        reject(error);
      }
    }
  )
 }
 //Obtener url imagen
 obtenerUrlImagen(respuesta: UploadResult){
  //retorna URL obtenida como referencia
  return getDownloadURL(respuesta.ref)

 }

 /**
  * Parametros definimos
  * @param {string} nombre <- nombre de la imagen
  * @param {any} imagen <- tipo de img que se pueden subir(extension)
  * @param {string} ruta <- ruta de almacenamiento de las img
  * @returns   <- se retorna lo obtenido
  */

    //SUBIR imagenes con sus referencias
    async subirImagen(nombre:string, imagen: any, ruta: string){
      try{
          let referenciaImgagen = ref(this.storage, ruta + '/' +nombre);
          this.respuesta = await uploadString(referenciaImgagen,imagen, 'data_url')
          .then(res => {
            return res;
          })
          return this.respuesta
      }
      catch(error)
      {
        console.log('error: \n'+error)
        return this.respuesta
      }
    }
}

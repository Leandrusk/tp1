import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../../service/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  //crear coleccion de productos del tipo producto -> lo defnimos con un array<<>
  coleccionProductos: Producto[] = []

  //Variable para manejar el estado de Edicion y eliminacion de productos
  modalVisibleProducto: boolean = false;

  //variable que va a tomar el producto que nosotros elijamos
  productoSeleccionado!: Producto //! recibe valores vacios
  //Definimos formulario para los productos
  /**
   * Atributos alfanumericos (string) se inicializan con comillas simples
   * Atributos numericos (number) se inicializan con (0)
   */

  nombreImagen!: string; // Obtendrá el nombre de la imagen

  imagen!: string; // Obtendrá la ruta de la imagen

  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required)
  })

  constructor(public servicioCrud: CrudService) {

  }

  ngOnInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;
    })
  }
  async agregarProducto() {
    //validamos los valores del producto agregado
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        //idProducto no se toma porque es generado por la BD y no el usuario
        idProducto: '',
        //el resto es tomado con informacion ingresada por el usuario
        nombre: this.producto.value.nombre!,
        descripcion: this.producto.value.descripcion!,
        precio: this.producto.value.precio!,
        categoria: this.producto.value.categoria!,
        // imagen: this.producto.value.imagen!,
        imagen: '',
        alt: this.producto.value.alt!,

      }
      await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(res => {
          //
          this.servicioCrud.obtenerUrlImagen(res)
            .then(url => {
              //
              this.servicioCrud.crearProductos(nuevoProducto, url)
                .then(producto => {
                  alert("Ha ingresado un nuevo producto con exito");
                  this.producto.reset();
                })
                .catch(error => {
                  alert("Hubo un problema al agregar un nuevo producto")
                  this.producto.reset();
                })
            })
        })
    }

  }
  //Funcion para alertar al usuario del producto que desea eliminar
  mostrarBorrar(productoSeleccionado: Producto) {
    //abre el modal
    this.modalVisibleProducto = true;
    //toma los valores del producto elegido
    this.productoSeleccionado = productoSeleccionado

  }
  //Funcion para eliminar el producto 
  borrarProducto() {
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto, 'url_de_la_imagen')
      .then(respuesta => {
        alert("El producto se ha eliminado correcto")
        this.producto.reset();
      })
      .catch(error => {
        alert("No se a podido eliminar " + error)
        this.producto.reset();
      })
  }

  //funcion para seleccionar el producto a editar
  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado

    //enviar o "setear" los nuevos valores y resignarlos a las variables
    //el ID no se vuelve a enviar ni se modifica, por ende no lo llamamos

    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt,
    })
  }
  editarProducto() {
    let datos: Producto = {
      //solo toma el ID y deja igual su valor
      idProducto: this.productoSeleccionado.idProducto,
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      imagen: '',
      alt: this.producto.value.alt!,


    }
    // Verificamos que el usuario ingrese una nueva imagen o no
    if (this.imagen) {
      this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "producto")
        .then(resp => {
          this.servicioCrud.obtenerUrlImagen(resp)
            .then(url => {
              //actualizamos URL de la imagen con los datos del formulario
              datos.imagen = url;

              //Actualizamos los datos desde el formulario de edicion
              this.actualizarProducto(datos);

              //vaciamos casillas del formulario
              this.producto.reset();
            })
            .catch(error => {
              alert(" error aweonao " + error);

              this.producto.reset();
            })

        })

    }
    else {
      /**
       * Actualizamos formulario con los datos recibidos del usuario, pero sin modificar la imagen ya existente en firebase y Storage
       */
      this.actualizarProducto(datos);
    }




  }

  //ACTUALIZA la info ya existente de los productos
  actualizarProducto(datos: Producto) {


    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(producto => {
        alert('Se ha modificado con exito');

      })
      .catch(error => {
        alert('hubo un problema al modificar el producto');
      })

  }
  //metodo para CARGAR IMAGENES
  cargarImagen(event: any) {
    //Varieble para obtener el archivo subido desde el input del html
    let archivo = event.target.files(0);

    let reader = new FileReader();

    if (archivo != undefined) {
      /**
   * Llamamos a metodo readAsDataURL para leer toda la info recibida.
   * Enviamos como parametro el archivo porque sera el encargado de tener la info
   * ingresada por el usuario
   */
      reader.readAsDataURL(archivo);


      reader.onloadend = () => {
        let url = reader.result;

        //verificamos que la URL sea existente y diferente a "nulo"
        if (url != null) {

          //Definimos nombre de la imagen con atributo "name" del input
          this.nombreImagen = archivo.name;


          //Definimos ruta de la imagen segun RUL recibida en formato cadena (string)
          this.imagen = url.toString()
        }
      }
    }
  }
}

import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  //string que modificara el valor de @input en el componente hijo
  product: string = '';

  //Creamos una colecion que se van a ir llenando en el carrusel
  productoCarrusel: Producto[] = [];


  productoAnanido(producto: Producto) {

    //Modificador del valor de 'product'
    this.product = `${producto.nombre} : $${producto.precio}`

    try {
      /*agregamos la informacion por el parametro de la funcion de la coleccion de carrusel*/
      this.productoCarrusel.push(producto);
      Swal.fire({
        title: 'Hola',
        text: 'añadido este producto con exito',
        icon: 'info'
      })

    } catch (error) {
      Swal.fire({
        title: 'oh no',
        text: 'le pifiaste paparulo\n'+error,
        icon: 'error'

      })
    }

  }
}
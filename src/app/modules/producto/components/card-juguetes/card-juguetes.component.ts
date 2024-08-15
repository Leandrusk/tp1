import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/service/crud.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-card-juguetes',
  templateUrl: './card-juguetes.component.html',
  styleUrls: ['./card-juguetes.component.css']
})
export class CardJuguetesComponent {


//Coleccion de todos los productos
  coleccionProductos: Producto[]=[]



//coleccion de solo productos de categoria "juguetes"

coleccionJuguetes: Producto[]=[]

productoSeleccionado!: Producto;

modalVisible:boolean=false

constructor(public servicioCrud: CrudService){

}

ngOnInit(): void{
  this.servicioCrud.obtenerProductos().subscribe(producto=> {
    this.coleccionProductos = producto;
  })

  //Mostrar la coleccion actual de juguetes
}


//Funcion para filtrar los productos que sean del tipo 'juguetes'
mostrarProductoJuguetes(){

  //forEach: filtra la coleccion
  this.coleccionProductos.forEach(producto => {
    //si la categoria del producto es 'juguetes', se enviara a la coleccion de juguetes especifica
    if(producto.categoria === "juguetes"){
      //.push sube o agrega un item a una coleccion
      this.coleccionJuguetes.push(producto);
    }
  })
}

mostrarVer(info:Producto){
  this.modalVisible = true;

  this.productoSeleccionado = info;
}






/*

  //No se donde va todo esto

  //Definimos coleccion local de productos
  coleccionProductos: Producto[]= [];

  //variable local para obtener producto seleccionado}
  productoSeleccionado!: Producto;

  //variable para manejar estado de un model
  modelVisible: boolean=false;

  constructor(public servicioCrud: CrudService){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProductos().subscribe(producto=> {
      this.coleccionProductos = producto;
    })
  }

  //funcion para modal que muestre la info de un producto en especifico

  mostrarVer(info: Producto){
    //habilita la visibilidad del model
    this.modelVisible = true;

    //Guarda info de un producto elegido por el usuario
    this.productoSeleccionado = info;
  }
    */
}

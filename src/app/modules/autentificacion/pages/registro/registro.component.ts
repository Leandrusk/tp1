import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

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

  //CREAR UNA COLECCION QUE SOLO RECIBE OBJETOS DEL TIPO USUARIOS
  coleccionUsuarios: Usuario[] =[];

  //FUNCION PARA EL REGISTRO

  registrar(){
    const credenciales={
    uid: this.usuarios.uid ,
    nombre: this.usuarios.nombre,
    apellido: this.usuarios.apellido,
    password: this.usuarios.password,
    rol: this.usuarios.rol,
    email: this.usuarios.email
    }
    //enviamos los nuevos registros por medio del metodo psuh a la coleccion
    this.coleccionUsuarios.push(credenciales)
    console.log(credenciales)
    console.log(this.coleccionUsuarios)
}
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutentificacionRoutingModule } from './autentificacion-routing.module';

// VISTAS DEL MÓDULO AUTENTIFICACIÓN
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';

// COMPONENTES DE MATERIAL
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

//declaro el selector del mat
import {MatSelectModule} from '@angular/material/select';

//COMPONENTES DE ANGULAR
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegistroComponent,
    InicioSesionComponent
  ],
  imports: [
    CommonModule,
    AutentificacionRoutingModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
  exports: [
    RegistroComponent,
    InicioSesionComponent,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonModule,
    FormsModule
  ]
})
export class AutentificacionModule { }

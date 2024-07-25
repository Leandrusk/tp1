import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ARCHIVO DE RUTAS
import { ProductoRoutingModule } from './producto-routing.module';

// VISTAS
import { ProductoComponent } from './pages/producto/producto.component';
import { IndumentariaComponent } from './pages/indumentaria/indumentaria.component';
import { AlimentacionComponent } from './pages/alimentacion/alimentacion.component';
import { JuguetesComponent } from './pages/juguetes/juguetes.component';

@NgModule({
  declarations: [
    ProductoComponent,
    IndumentariaComponent,
    AlimentacionComponent,
    JuguetesComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ],
  exports: [
    ProductoComponent,
    IndumentariaComponent,
    AlimentacionComponent,
    JuguetesComponent
  ]
})
export class ProductoModule { }

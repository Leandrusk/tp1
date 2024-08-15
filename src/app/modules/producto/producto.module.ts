import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ARCHIVO DE RUTAS
import { ProductoRoutingModule } from './producto-routing.module';

// VISTAS
import { ProductoComponent } from './pages/producto/producto.component';
import { IndumentariaComponent } from './pages/indumentaria/indumentaria.component';
import { AlimentacionComponent } from './pages/alimentacion/alimentacion.component';
import { JuguetesComponent } from './pages/juguetes/juguetes.component';
import { CardJuguetesComponent } from './components/card-juguetes/card-juguetes.component';
import { CardComponent } from '../inicio/components/card/card.component';

//

@NgModule({
  declarations: [
    ProductoComponent,
    IndumentariaComponent,
    AlimentacionComponent,
    JuguetesComponent,
    CardJuguetesComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ],
  exports: [
    ProductoComponent,
    IndumentariaComponent,
    AlimentacionComponent,
    JuguetesComponent,
    CardComponent,
    CardJuguetesComponent,
  ]
})
export class ProductoModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// COMPONENTES GLOBALES
import { SharedModule } from './modules/shared/shared.module';

// FIREBASE VINCULACIONES/IMPORTACIONES CON FIREBASE

import { enviroment } from 'src/enviroments/environments';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    //COMPONENTES GLOBALES
    AngularFireModule.initializeApp (enviroment.firebaseConfig),

    AngularFireAuthModule,
    //Storage
    AngularFireStorageModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }

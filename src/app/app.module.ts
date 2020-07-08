import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatToolbarModule } from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSlXoV2c5FZxiIUEs7DMDzgc1XNMJZcbc",
  authDomain: "todo-app-10856.firebaseapp.com",
  databaseURL: "https://todo-app-10856.firebaseio.com",
  projectId: "todo-app-10856",
  storageBucket: "todo-app-10856.appspot.com",
  messagingSenderId: "21826320733",
  appId: "1:21826320733:web:20bd9cda67aab898a210b4",
  measurementId: "G-RKP8C8TEY6"
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

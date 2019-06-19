import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FileDropModule } from 'ngx-file-drop';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { CoreModule } from './core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '@app/home/home.component';
import { HeaderComponent } from '@app/header/header.component';
import { LoginComponent } from '@app/login/login.component';
import { UsersComponent } from '@app/users/users.component';
import { BoardsComponent } from '@app/boards/boards.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    UsersComponent,
    BoardsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'afs-app' }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    CoreModule,
    AppRoutingModule,
    TransferHttpCacheModule,
    FileDropModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

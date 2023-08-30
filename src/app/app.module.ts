import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EntityDataModule, EntityDataService } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HotToastModule } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';
import { entityConfig } from './entity-metadata';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth-service/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    HotToastModule.forRoot({}),
    

    // Ngrx Store
    StoreModule.forRoot({}),
     StoreDevtoolsModule.instrument({
         maxAge: 25,
     }),
     EffectsModule.forRoot([]),
     EntityDataModule.forRoot(entityConfig),

  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    entityDataService:EntityDataService,
    // UserService:UserDataService,
    ){
      /* 
      entityDataService.registerServices({'User': UserService})
      */
    }
}

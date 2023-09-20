import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { NgxPaginationModule } from 'ngx-pagination';
import { TransactionDataService } from './dashboard/shared/ngrx-store/transaction/transaction-data.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { CustomerDataService } from './dashboard/shared/ngrx-store/customer/customer-data.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    HotToastModule.forRoot({}),
    NgxPaginationModule,
    

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
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    entityDataService:EntityDataService,
    TransactionService: TransactionDataService,
    CustomerService: CustomerDataService,
    // UserService:UserDataService,
    ){
      entityDataService.registerServices({'Transaction':TransactionService})
      entityDataService.registerServices({'Customer':CustomerService})
      /* 
      entityDataService.registerServices({'User': UserService})
      */
    }
}

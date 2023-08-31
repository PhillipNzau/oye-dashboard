import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/auth-service/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { UserResolver } from './dashboard/shared/resolver/user.resolver';

const routes: Routes = [
  {
    path: '', 
    loadChildren:() => import('./dashboard/dashboard.routes').then(mod => mod.DASHBOARD_ROUTES),
    // canActivate:[() => inject(AuthService).isLoggedIn],
    // resolve: {
    //   user: UserResolver
    // }
  },
  {
    path: 'auth', 
    component: LoginComponent,
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

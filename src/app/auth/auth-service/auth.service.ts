import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { Login, LoginRes } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  loginUrl = environment.loginUrl;
  logoutUrl = environment.loginUrl


  constructor(
   private http: HttpClient,
   private route:Router
  ) { }

  add(loginData:Login) {
    return this.http.post<LoginRes>(this.loginUrl, loginData).pipe(
      map((res:LoginRes) => {
        if(res.token) {
          localStorage.setItem('pdTkn', res.token);
          localStorage.setItem('pdRTkn', res.refreshToken);
          localStorage.setItem('pdScp', res.scope);

          this.route.navigate(['/']).then(() => {})
        } else {
        return
        }
      })
    )

  }

  logoutUser(logout:string) {
    return  localStorage.clear()
  }

  // Returns true when user is loged in and email is verified
  get isLoggedIn() {
    this.loggedIn = !!localStorage.getItem('pdTkn');

    if (!this.loggedIn) {
     return this.route.navigate(['/auth']).then(() => {})
    }
    return this.loggedIn;
  }

}
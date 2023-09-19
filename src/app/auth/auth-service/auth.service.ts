import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { Login, LoginRes, LoginResModel } from '../models/login';

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

  login(loginData:Login) {
    return this.http.post<LoginResModel>(this.loginUrl, loginData).pipe(
      map((res:LoginResModel) => {
        const response = res.data
        
        if(response.access_token) {
          localStorage.setItem('oydTkn', response.access_token);
          localStorage.setItem('oydRTkn', response.refresh_token);
          localStorage.setItem('oydExp', response.expires_in);

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
    this.loggedIn = !!localStorage.getItem('oydTkn');

    if (!this.loggedIn) {
     return this.route.navigate(['/auth']).then(() => {})
    }
    return this.loggedIn;
  }

}
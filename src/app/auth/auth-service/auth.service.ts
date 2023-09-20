import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { Login, LoginRes, LoginResModel } from '../models/login';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  loginUrl = environment.loginUrl;
  refreshUrl = environment.refreshUrl;
  logoutUrl = environment.loginUrl


  constructor(
   private http: HttpClient,
   private route:Router,
   private toastService: HotToastService,

  ) { }

  login(loginData:Login) {
    return this.http.post<LoginResModel>(this.loginUrl, loginData).pipe(
      map((res:LoginResModel) => {
        const response = res.data
        const userResponse = res.user
        
        if(response.access_token) {
          localStorage.setItem('oydTkn', response.access_token);
          localStorage.setItem('oydRTkn', response.refresh_token);
          localStorage.setItem('oydExp', response.expires_in);
          localStorage.setItem('oydUsr', JSON.stringify(userResponse));
          this.toastService.success(`Welcome ${userResponse?.first_name}!`) 

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

  refreshToken(refreshToken:string | null) {
    const refresh = {
      refresh_token: refreshToken
    }
    return this.http.post<any>(this.refreshUrl, refresh).pipe(
      map((res:any)=> {
        if(res.data.access_token) {
          localStorage.setItem('oydTkn', res.data.access_token);
          localStorage.setItem('oydRTkn', res.data.refresh_token);
          localStorage.setItem('oydExp', res.data.expires_in);
        }
        
      })
    )
    
  }

}
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth-service/auth.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private route: Router,
    private toastService: HotToastService,

    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    const token = localStorage.getItem('oydTkn');

    if (token) {

      request = this.addTokenToRequest(request, token);
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          // Token might be expired, try refreshing it
          
          return this.handleTokenExpiration(request, next);
        }
        console.log('int err', err);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleTokenExpiration(request: HttpRequest<unknown>, next: HttpHandler):any {
    localStorage.clear();
    this.route.navigate(['/auth'])
    this.toastService.info('Kindly login, your session expired!')
    // const tokenExpirationTime = this.calculateTokenExpirationTime();
    // const refresh_token = localStorage.getItem('oydRTkn');

    // if (tokenExpirationTime === null) {
    //   // Token expiration time is not available or token is expired, handle accordingly
    //   // You can handle this case by logging out the user or redirecting to the login page
    //   // For now, we'll rethrow the original error
    //   console.log(
    //   'Token is not available or expired but received a 401 status'
    //   );
    //   return
    // }

    // if (tokenExpirationTime <= new Date()) {
      
    //   // Token is expired, call your refresh token service to get a new token
    //   this.authService.refreshToken(refresh_token).subscribe({
    //     next: () =>{
    //       const token = localStorage.getItem('oydTkn');
    //       console.log('data', token);

    //       if(token){
    //         const updatedRequest = this.addTokenToRequest(request, token);
    //         console.log('in here', request);
            
    //         return next.handle(updatedRequest);
    //       } else {
    //         return
    //       }
    //       // Retry the request with the new token
          
    //     },
    //     error: error =>{}
    //   })
      
    // } else {
    //   // Token is still valid, rethrow the original error
    //   return throwError('Token is not expired but received a 401 status');
    // }
  }

  private calculateTokenExpirationTime(): Date | null{
    
    // const tokenExpirationTime = localStorage.getItem('oydExp');
    const tokenExpirationTime = 3200;
    if (!tokenExpirationTime) {
      // Token expiration time is not stored
      return null;
    }

    const expirationTime = new Date(tokenExpirationTime);

    // if (expirationTime <= new Date()) {
    //   // Token is expired
    //   return null;
    // }
    return expirationTime;
  }
}

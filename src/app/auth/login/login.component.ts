import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { Login } from '../models/login';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  resetPwdForm:FormGroup;
  isLoggedIn: boolean = false;
  forgotPwd:boolean = false;
  passwordResetStatus:boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    // private settingService:SettingsService,
    private toastService: HotToastService,
    private route: Router
  ) {
    this.loginForm = this.fb.group({
      // username: ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.email]],
      user_name: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.resetPwdForm = this.fb.group({
      email:['',[Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
    // this.toastService.success('Welcome!');

    // Check if user is logged in, if user is logged in redirect to home page
    !!localStorage.getItem('oydTkn') ? this.route.navigate(['/']).then(() => {}) : null 
  }
  
  toggleForgot() {
    this.forgotPwd = !this.forgotPwd    
  }

  // login function
  loginUser() {
    const loadingToast = this.toastService.loading('Processing...');

    const loginData: Login = {
      ...this.loginForm.value
    }
    this.authService.login(loginData).subscribe({
      next: () => { 
        loadingToast.close();

        this.toastService.success('Welcome!');
      },
      error:(err:any) => {
        loadingToast.close();
        this.toastService.error(`Something went wrong!: ${err.error.message}`) 
      }
    });
  }




}

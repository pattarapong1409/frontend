import { Component ,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

// import { SnackbarServices } from '../../services/snackbar.service';
import { SnackbarService } from '../services/snackbar.services';
import jwt_decode, { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
            MatButtonModule,
            FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  responseMessage: any;
  actype: any;
  errorMessage: string = '';

  constructor(private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService) {
    this.loginForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),//ตรวจสอบค่าที่รับมามีรูปแบบของอีเมล์
      password: new FormControl("", [
        Validators.required, 
        Validators.minLength(7)]),
    })
  }
  
  login() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((response: any) => {
        const token: any = localStorage.getItem("token");
        var decodedToken: any;
        try {
          decodedToken = jwtDecode(token);
          console.log(decodedToken.userId);
        } catch (err) {
          localStorage.clear();
          this.router.navigate(["login"]);
        }


        this.responseMessage = response?.message;
        this.actype = response?.actype;
        // console.log(response?.message);
        // console.log(response?.actype);
        this.snackbarService.openSnackBar(this.responseMessage, "");
        if (this.responseMessage === "login successfully") {
          if (this.actype == "user") {
            this.router.navigate(["user"], { queryParams: { userId: decodedToken.userId } });
          } else if (this.actype == "admin") {
            this.router.navigate(["admin"], { queryParams: { userId: decodedToken.userId } });
          }
        } else {
          this.router.navigate(["login"]);
        }
      }, (error) => {
        console.error('Error occurred:', error);
        if (error.status === 401) {
          this.errorMessage = 'Wrong password!';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        this.snackbarService.openSnackBar(this.errorMessage, 'error');
      }
      );
  }

}

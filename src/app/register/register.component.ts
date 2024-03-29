import { Component , OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; // นำเข้า MatInputModule
import { MatSelectModule } from '@angular/material/select'; // นำเข้า MatSelectModule

import { AuthService } from '../services/auth.service';
import { ImageUploadService } from '../services/upload-services.services';
import { SnackbarService } from '../services/snackbar.services';
import { Router } from '@angular/router';
import { GlobalConstants } from '../global/global-constants';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatFormFieldModule,
            MatButtonModule,RouterModule,ReactiveFormsModule,MatInputModule,MatSelectModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  responseMessage: any;
  signupForm: FormGroup;
  avatar_img: string | null = null;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private authService: AuthService,
              private router:Router,
              private snackbarService:SnackbarService,
              private uploadService: ImageUploadService,) {
    this.signupForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      avatar:  new FormControl("", [Validators.required]),//ต้องมีความยาวอย่างน้อย 2 ตัวอักษร
      name: new FormControl("", [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
      email: new FormControl("", [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]),
      password: new FormControl("", [
        Validators.required, 
        Validators.minLength(7)]),
    });
  }

  signup(): void {
    this.authService.signup(this.signupForm.value)
    .subscribe((response: any) => {
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "");
      this.router.navigate(['/login']);
    }, (error) => {
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

  // onFileSelected(event: any){
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.signupForm.patchValue({
  //       avatar_img: file.name // เซ็ตค่าชื่อไฟล์ให้กับฟิลด์ avatar_img
  //     });
  //   }
  // }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {
    this.uploadService.uploadFile(file)
      .then(downloadURL => {
        console.log('File uploaded successfully. Download URL:', downloadURL);
        this.avatar_img = downloadURL;
        this.signupForm.get('avatar')?.setValue(downloadURL);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
      if (file) {
        // Set selected image URL for preview
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            this.selectedImage = e.target.result;
          }
        };
        reader.readAsDataURL(file);
  }
 
}

}




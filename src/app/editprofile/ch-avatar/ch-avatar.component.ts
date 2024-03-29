import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../services/snackbar.services';
import { ImageUploadService } from '../../services/upload-services.services';

@Component({
  selector: 'app-ch-avatar',
  standalone: true,
  imports: [ReactiveFormsModule,
            CommonModule,
            MatToolbarModule,
            MatFormFieldModule,
            MatButtonModule,
            MatInputModule],
  templateUrl: './ch-avatar.component.html',
  styleUrl: './ch-avatar.component.scss'
})
export class ChAvatarComponent {

  errorMessage: string = '';
  AvatarForm: FormGroup = new FormGroup({});
  aid: any;
  avatar_img: any;
  selectedImage: any;
  newAvatarImg: any;

  constructor(private http: HttpClient,
    private snackbarService: SnackbarService,
    private uploadService: ImageUploadService) { }

  ngOnInit(): void {
    this.AvatarForm = this.createFormGroup();

    this.aid = localStorage.getItem('aid');
    this.avatar_img = localStorage.getItem('avatar_img');
    // console.log(this.aid);

    if (this.aid !== null) {
      const userIdControl = this.AvatarForm.get('userId');
      if (userIdControl !== null) { // Null check
        userIdControl.setValue(this.aid);
      }
    }

    this.selectedImage = this.avatar_img;
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      userId: new FormControl('', Validators.required),
      newAvatarImg: new FormControl('', Validators.required),
    });
  }

  changeAvatarImg() { 
    if (this.AvatarForm.invalid) {
      return;
    }

    const body = this.AvatarForm.value;
    console.log(body);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put<any>('https://backend-vmew.onrender.com/auth/changeAvatar', body, { headers })  //ต้องเปลี่ยนเป็น backend server
      .subscribe({
        next: () => {
          console.log('Avatar changed successfully.'); 
          this.snackbarService.openSnackBar('Avatar changed successfully.', 'success');
          this.AvatarForm.reset();
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error occurred:', error);
          this.errorMessage = 'An error occurred. Please try again later.';
          this.snackbarService.openSnackBar(this.errorMessage, 'error');
        }
      });
  }


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
        this.newAvatarImg = downloadURL;
        this.AvatarForm.get('newAvatarImg')?.setValue(downloadURL);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  
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

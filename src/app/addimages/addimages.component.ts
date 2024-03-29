import { Component } from '@angular/core';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ImageService } from '../services/image.service';
import { ImageUploadService } from '../services/upload-services.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addimages',
  standalone: true,
  imports: [RouterModule,
            CommonModule,
            MatCardModule
            ,MatFormFieldModule,
            MatButtonModule,
            MatToolbarModule,
            MatIconModule,
            MatMenuModule],
  templateUrl: './addimages.component.html',
  styleUrl: './addimages.component.scss'
})
export class AddimagesComponent {

  userId: any;
  avatar_img: any;
  name: any;
  email: any;
  images: any[] = [];
  aid: any;
  downloadURL: any;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private uploadService: ImageUploadService,
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.getUsedetail();
      this.aid = localStorage.getItem('aid');
      this.avatar_img = localStorage.getItem('avatar_img');
      this.name = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
    } else {
      console.warn('localStorage is not available. Skipping initialization.');
    }

  }

  getUsedetail() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });
    this.authService.getUsedetail(this.userId)
      .subscribe((response: any) => {
        this.aid = response?.aid;
        this.avatar_img = response?.avatar;
        this.name = response?.name;
        this.email = response?.email;

        localStorage.setItem('aid', this.aid);
        localStorage.setItem('avatar_img', this.avatar_img);
        localStorage.setItem('name', this.name);
        localStorage.setItem('email', this.email);
      }, (error) => {
        console.error("Error occurred while fetching user details:", error);
      });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadImage(file);
    }
  }

  uploadImage(file: File): void {
    this.uploadService.uploadFile(file)
      .then(downloadURL => {
        console.log('File uploaded successfully. Download URL:', downloadURL);
        this.downloadURL = downloadURL;
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

  getAdd(): void {
    if (this.downloadURL) {
      const image_url = this.downloadURL;
      const fashmash_id = this.aid = localStorage.getItem('aid');
      this.imageService.getAdd(image_url, fashmash_id).subscribe(
        () => {
          console.log('Image added successfully');
          this.router.navigate(['/profile']);
        },
        error => {
          console.error('Error adding image:', error);
        }
      );
    } else {
      console.error('Download URL is null.');
    }
  }
}

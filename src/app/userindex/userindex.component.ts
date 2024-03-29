import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
// import { RouterLink, Router } from '@angular/router';

import { EloService } from '../services/elo.service';
import { ImageService } from '../services/image.service';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-userindex',
  standalone: true,
  imports: [CommonModule,MatCardModule,
            MatFormFieldModule,MatButtonModule,
            RouterModule,MatToolbarModule,MatIconModule,
            MatMenuModule],
  templateUrl: './userindex.component.html',
  styleUrl: './userindex.component.scss'
})
export class UserindexComponent implements OnInit{

  images: any[] = [];
  character1Image: any = '';
  character2Image: any = '';
  originalCharacter1Image: any = '';
  originalCharacter2Image: any = '';
  currentUser: any;
  userId: any;
  avatar_img: any;
  name: any;
  email: any;
  aid: any;

  constructor(private imageService: ImageService, 
    private eloService: EloService,
    private httpClient: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      // ทำงานก็ต่อเมื่อมี localStorage ในฝั่งของเบราว์เซอร์
      this.getAllImages();
      this.getUsedetail();

      this.aid = localStorage.getItem('aid');
      this.avatar_img = localStorage.getItem('avatar_img');
      this.name = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
    } else {
      console.warn('localStorage is not available. Skipping initialization.');
    }

  }

  getAllImages() {
    this.imageService.getAllImages().subscribe(
      data => {
        this.images = data;
        this.randomizeImages();
      },
      error => {
        console.error(error);
      }
    );
  }

  randomizeImages() {
    if (this.images.length > 0) {
      const data = this.images[0];
      const randomIndex1 = Math.floor(Math.random() * data.length);
      const randomIndex2 = Math.floor(Math.random() * data.length);
      this.character1Image = data[randomIndex1];
      this.character2Image = data[randomIndex2];
      this.originalCharacter1Image = this.character1Image;
      this.originalCharacter2Image = this.character2Image;
    }
  }

  onClickC1() {
    const newRating1 = this.eloService.calculateNewRating(this.character1Image.points, this.character2Image.points, true);
    const newRating2 = this.eloService.calculateNewRating(this.character2Image.points, this.character1Image.points, false);
    const id1 = this.character1Image.image_id;
    const id2 = this.character2Image.image_id;
  
    this.character1Image.points = newRating1;
    this.character2Image.points = newRating2;
  
    this.imageService.updatePoints(id1, newRating1).subscribe({
      next: (data) => {
        console.log('Character 1 points updated successfully', data);
      },
      error: (error) => {
        console.error('Failed to update Character 1 points:', error);
      }
    });
  
    this.imageService.updatePoints(id2, newRating2).subscribe({
      next: (data) => {
        console.log('Character 2 points updated successfully', data);
      },
      error: (error) => {
        console.error('Failed to update Character 2 points:', error);
      }
    });
  
    this.randomizeImages();
  }
  
  onClickC2() {
    const newRating1 = this.eloService.calculateNewRating(this.character1Image.points, this.character2Image.points, false);
    const newRating2 = this.eloService.calculateNewRating(this.character2Image.points, this.character1Image.points, true);
    const id1 = this.character1Image.image_id;
    const id2 = this.character2Image.image_id;
  
    this.character1Image.points = newRating1;
    this.character2Image.points = newRating2;
  
    this.imageService.updatePoints(id1, newRating1).subscribe({
      next: (data) => {
        console.log('Character 1 points updated successfully', data);
      },
      error: (error) => {
        console.error('Failed to update Character 1 points:', error);
      }
    });
  
    this.imageService.updatePoints(id2, newRating2).subscribe({
      next: (data) => {
        console.log('Character 2 points updated successfully', data);
      },
      error: (error) => {
        console.error('Failed to update Character 2 points:', error);
      }
    });
  
    this.randomizeImages();
  }

  randomC2() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.images[0].length);
    } while (this.character1Image === this.images[0][newIndex]);
    this.character2Image = this.images[0][newIndex];
  }

  randomC1() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.images[0].length);
    } while (this.character2Image === this.images[0][newIndex]);
    this.character1Image = this.images[0][newIndex];
  }
  
  getUsedetail() {
    this.route.queryParams.subscribe(params => {
      // Get the value of 'email' parameter from the URL
      this.userId = params['userId'];
    });
    this.authService.getUsedetail(this.userId)
      .subscribe((response: any) => {

        this.aid = response?.aid;
        this.avatar_img = response?.avatar;
        this.name = response?.name;
        this.email = response?.email;

        // Set values in localStorage
        localStorage.setItem('aid', this.aid);
        localStorage.setItem('avatar_img', this.avatar_img);
        localStorage.setItem('name', this.name);
        localStorage.setItem('email', this.email);

        console.log(response?.aid);
        console.log(response?.avatar_img);
        console.log(response?.name);
        console.log(response?.email);

      }, (error) => {
        console.error("Error occurred while fetching user details:", error);
      }
      );
  }

}

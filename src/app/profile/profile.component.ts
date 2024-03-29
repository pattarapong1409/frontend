import { Component ,PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../services/auth.service';
import { ImageService } from '../services/image.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgFor,NgIf } from '@angular/common';

import { ChnameComponent } from '../editprofile/chname/chname.component';
import { ChpasswordComponent } from '../editprofile/chpassword/chpassword.component';
import { ChAvatarComponent } from '../editprofile/ch-avatar/ch-avatar.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,
            MatCardModule,
            MatFormFieldModule,
            MatButtonModule,
            RouterModule,
            MatToolbarModule,
            MatIconModule,
            MatMenuModule,
            NgFor,
            NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userId: any;
  avatar_img: any;
  name: any;
  email: any;
  images: any[] = [];
  aid: any;
  id: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      // this.getUsedetail();
      this.getOnlyone();
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
        this.avatar_img = response?.avatar_img;
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

  getOnlyone() {
    this.aid = localStorage.getItem('aid');
    this.imageService.getOnly(this.aid).subscribe(
      data => {
        this.images = data[0];
        this.id = data[0]?.images_id; // Corrected line
        localStorage.setItem('image_id', this.id); // Corrected line
      },
      error => {
        console.error(error);
      }
    );
  }

  changepw() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "1000px";
    dialogConfig.width = "1000px";
    this.dialog.open(ChpasswordComponent,dialogConfig);
  }

  changename() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "1000px";
    dialogConfig.width = "1000px";
    this.dialog.open(ChnameComponent,dialogConfig);
    }

    changeAvatar() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "1000px";
      dialogConfig.width = "1000px";
      this.dialog.open(ChAvatarComponent,dialogConfig);
      }
}

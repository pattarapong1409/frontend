import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { NgFor } from '@angular/common';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-rank',
  standalone: true,
  imports: [CommonModule,
            MatCardModule,
            MatFormFieldModule,
            MatButtonModule,
            RouterModule,
            MatToolbarModule,
            MatIconModule,
            MatMenuModule,NgFor],
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.scss'
})

export class RankComponent implements OnInit{
  images: any[] = [];
  topTenImages: any[] = [];
  
  constructor(private imageService: ImageService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.topTenImages = await this.getTopTenImages();
    } catch (error) {
      console.error(error);
    }
  }
  
  async getTopTenImages(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.imageService.getAllImages().subscribe(
        (data: any[]) => {
          const sortedData = data[0].slice().sort((a: any, b: any) => b.points - a.points);
          const topTenImages = sortedData.slice(0, 10);
          resolve(topTenImages);
        },
        error => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

}

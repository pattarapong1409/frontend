import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { Component, OnInit } from '@angular/core';
import Chart, { registerables } from 'chart.js/auto';
@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})export class GraphComponent implements OnInit {

  chart:any;

  ngOnInit() {
    this.chart = new Chart("canvas", {
      type: 'bar',
      data: {
        labels: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
        datasets: [{
          label: 'Votes',
          data: [12, 19, 3, 5,20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 5)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
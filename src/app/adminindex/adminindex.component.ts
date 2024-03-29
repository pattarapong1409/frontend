import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-adminindex',
  standalone: true,
  imports: [RouterModule,
            CommonModule,
            MatCardModule
            ,MatFormFieldModule,
            MatButtonModule,
            MatToolbarModule,
            MatIconModule,
            MatMenuModule],
  templateUrl: './adminindex.component.html',
  styleUrl: './adminindex.component.scss'
})
export class AdminindexComponent {

}

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserindexComponent } from './userindex/userindex.component';
import { ProfileComponent } from './profile/profile.component';
import { GraphComponent } from './graph/graph.component';
import { RegisterComponent } from './register/register.component';
import { RankComponent } from './rank/rank.component';
import { AdminindexComponent } from './adminindex/adminindex.component';
import { AddimagesComponent } from './addimages/addimages.component';

export const routes: Routes = [
    {path: '',component: LoginComponent},
    {path: 'signup',component: RegisterComponent },
    {path: 'login',component: LoginComponent},
    {path: 'user',component: UserindexComponent},
    {path: 'admin',component: AdminindexComponent},
    
    {path: 'logout',component: LoginComponent},
    {path: 'profile',component: ProfileComponent},
    {path: 'home',component: UserindexComponent},
    {path: 'graph',component: GraphComponent},
    {path: 'add-img',component: AddimagesComponent},
    {path: 'rank',component: RankComponent}
];

import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { ArticleEditComponent } from './components/article/article-edit/article-edit.component';
import { ArticleAddComponent } from './components/article/article-add/article-add.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { NewComponentComponent } from './components/new-component/new-component.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'new-component',
    component: NewComponentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: AuthComponent },
      { path: 'register', component: AuthComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: ArticleListComponent },
      { path: 'articles/edit/:id', component: ArticleEditComponent },
      { path: 'articles/add', component: ArticleAddComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

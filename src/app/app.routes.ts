import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { ArticleEditComponent } from './components/article/article-edit/article-edit.component';
import { ArticleAddComponent } from './components/article/article-add/article-add.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: ArticleListComponent },
      { path: 'articles/edit/:id', component: ArticleEditComponent },
      { path: 'articles/add', component: ArticleAddComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { ArticleEditComponent } from './components/article/article-edit/article-edit.component';
import { ArticleAddComponent } from './components/article/article-add/article-add.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    ArticleEditComponent,
    ArticleAddComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard/articles', component: ArticleListComponent },
      { path: 'dashboard/articles/edit/:id', component: ArticleEditComponent },
      { path: 'dashboard/articles/add', component: ArticleAddComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

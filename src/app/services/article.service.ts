import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Article {
  id?: number;
  title: string;
  content: string;
  category: string;
  authorId: number;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:3000/articles';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl).pipe(
      tap((articles) => console.log('Fetched articles:', articles)),
      catchError(this.handleError)
    );
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`).pipe(
      tap((article) => console.log(`Fetched article id=${id}`, article)),
      catchError(this.handleError)
    );
  }

  createArticle(article: Article): Observable<Article> {
    // Ensure timestamp is set
    const newArticle = {
      ...article,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return this.http.post<Article>(this.apiUrl, newArticle).pipe(
      tap((newArticle) => console.log('Created article:', newArticle)),
      catchError(this.handleError)
    );
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    // Ensure updatedAt is set
    const updatedArticle = {
      ...article,
      updatedAt: new Date().toISOString(),
    };

    return this.http.put<Article>(`${this.apiUrl}/${id}`, updatedArticle).pipe(
      tap((_) => console.log(`Updated article id=${id}`)),
      catchError(this.handleError)
    );
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap((_) => console.log(`Deleted article id=${id}`)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

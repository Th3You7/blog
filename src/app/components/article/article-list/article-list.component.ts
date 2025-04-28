import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleService, Article } from '../../../services/article.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  comments: Comment[] = [];
  filteredArticles: Article[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  searchTerm: string = '';

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.articleService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.filteredArticles = [...articles];
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load articles. Please try again later.';
        console.error('Error loading articles:', error);
        this.isLoading = false;
      },
    });
  }

  loadComments(): void {
    this.articleService.getComments().subscribe({
      next: (comments) => {
        this.comments = comments;
      },
    });
  }

  editArticle(id: number): void {
    this.router.navigate(['/dashboard/articles/edit', id]);
  }

  deleteArticle(id: number): void {
    if (confirm('Are you sure you want to delete this article?')) {
      this.isLoading = true;
      this.articleService.deleteArticle(id).subscribe({
        next: () => {
          this.articles = this.articles.filter((article) => article.id !== id);
          this.filteredArticles = this.filteredArticles.filter(
            (article) => article.id !== id
          );
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage =
            'Failed to delete article. Please try again later.';
          console.error('Error deleting article:', error);
          this.isLoading = false;
        },
      });
    }
  }

  addNewArticle(): void {
    this.router.navigate(['/dashboard/articles/add']);
  }

  searchArticles(): void {
    if (!this.searchTerm.trim()) {
      this.filteredArticles = [...this.articles];
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredArticles = this.articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTermLower) ||
        article.content.toLowerCase().includes(searchTermLower) ||
        article.category.toLowerCase().includes(searchTermLower)
    );
  }
}

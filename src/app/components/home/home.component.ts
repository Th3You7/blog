import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { ArticleCardComponent } from '../shared/article-card/article-card.component';
import { ThemeService } from '../../services/theme.service';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ArticleCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  categories = [
    'All',
    'Technology',
    'Programming',
    'Web Development',
    'Design',
    'Business',
  ];
  selectedCategory = 'All';
  isLoading = true;
  error: string | null = null;

  constructor(
    private themeService: ThemeService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.themeService.init();
    this.loadArticles();
  }

  loadArticles(): void {
    this.isLoading = true;
    this.error = null;

    this.articleService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.filteredArticles = [...articles];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load articles. Please try again later.';
        this.isLoading = false;
        console.error('Error loading articles:', err);
      },
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;

    if (category === 'All') {
      this.filteredArticles = [...this.articles];
    } else {
      this.filteredArticles = this.articles.filter(
        (article) => article.category === category
      );
    }
  }
}

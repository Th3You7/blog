import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { ArticleCardComponent } from '../shared/article-card/article-card.component';
import { ThemeService } from '../../services/theme.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ArticleCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  articles: Article[] = [
    {
      id: 1,
      title: 'Getting Started with Angular',
      content:
        'Angular is a platform for building mobile and desktop web applications. Angular is built on TypeScript and includes a component-based framework for building scalable web applications, a collection of well-integrated libraries covering a wide variety of features, including routing, forms management, client-server communication, and more, and a suite of developer tools to help you develop, build, test, and update your code.',
      category: 'Angular',
      authorId: 1,
      authorName: 'Admin User',
      createdAt: '2023-01-15T09:30:00.000Z',
      updatedAt: '2023-01-15T09:30:00.000Z',
      commentsCount: 5,
      imageUrl: 'https://source.unsplash.com/random/800x600?sig=1',
    },
    {
      id: 2,
      title: 'Tailwind CSS Basics',
      content:
        'Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. Tailwind CSS is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.',
      category: 'CSS',
      authorId: 1,
      authorName: 'Admin User',
      createdAt: '2023-01-20T11:45:00.000Z',
      updatedAt: '2023-01-20T11:45:00.000Z',
      commentsCount: 3,
      imageUrl: 'https://source.unsplash.com/random/800x600?sig=2',
    },
    {
      id: 3,
      title: 'TypeScript for JavaScript Developers',
      content:
        'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. TypeScript adds additional syntax to JavaScript to support a tighter integration with your editor. Catch errors early in your editor. TypeScript understands JavaScript and uses type inference to give you great tooling without additional code.',
      category: 'TypeScript',
      authorId: 1,
      authorName: 'Admin User',
      createdAt: '2023-02-05T14:20:00.000Z',
      updatedAt: '2023-02-05T14:20:00.000Z',
      commentsCount: 2,
      imageUrl: 'https://source.unsplash.com/random/800x600?sig=3',
    },
    {
      id: 4,
      title: 'Introduction to RxJS',
      content:
        'RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code. RxJS provides an implementation of the Observable type, which is needed until the type becomes part of the language, along with supporting operators to enable the reactive style of programming.',
      category: 'JavaScript',
      authorId: 1,
      authorName: 'Admin User',
      createdAt: '2023-02-10T08:15:00.000Z',
      updatedAt: '2023-02-10T08:15:00.000Z',
      commentsCount: 4,
      imageUrl: 'https://source.unsplash.com/random/800x600?sig=4',
    },
    {
      id: 5,
      title: 'Angular Router Deep Dive',
      content:
        'The Angular Router enables navigation from one view to the next as users perform application tasks. The router leverages the browsers built-in navigation model and history API to provide advanced features such as component-based routing, route guards, lazy loading, and more.',
      category: 'Angular',
      authorId: 1,
      authorName: 'Admin User',
      createdAt: '2023-02-15T10:30:00.000Z',
      updatedAt: '2023-02-15T10:30:00.000Z',
      commentsCount: 1,
      imageUrl: 'https://source.unsplash.com/random/800x600?sig=5',
    },
  ];

  categories = ['All', 'Angular', 'CSS', 'JavaScript', 'TypeScript'];

  selectedCategory = 'All';
  filteredArticles: Article[] = [...this.articles];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.init();
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

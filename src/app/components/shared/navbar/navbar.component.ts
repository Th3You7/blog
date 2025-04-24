import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isDarkMode = false;
  isLoggedIn = false; // Will be connected to auth service later
  isSearchOpen = false; // Keeping for backwards compatibility
  isInlineSearchVisible = false;
  isCategoryDropdownOpen = false;
  searchQuery = '';
  private themeSubscription!: Subscription;

  categories = [
    'Technology',
    'Travel',
    'Food',
    'Health',
    'Finance',
    'Lifestyle',
  ];

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService.darkMode$.subscribe(
      (isDark: boolean) => {
        this.isDarkMode = isDark;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleSearch(): void {
    // Now just redirects to inline search for compatibility
    this.toggleInlineSearch();
  }

  toggleInlineSearch(): void {
    this.isInlineSearchVisible = !this.isInlineSearchVisible;
    if (this.isInlineSearchVisible) {
      setTimeout(() => {
        const inlineSearchInput = document.getElementById('inlineSearchInput');
        if (inlineSearchInput) {
          inlineSearchInput.focus();
        }
      }, 100);
    } else {
      this.searchQuery = '';
    }
  }

  toggleCategoryDropdown(): void {
    this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
  }

  closeCategoryDropdown(): void {
    setTimeout(() => {
      this.isCategoryDropdownOpen = false;
    }, 200);
  }

  searchArticles(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery.trim() },
      });
      // Close the search after submitting
      if (this.isInlineSearchVisible) {
        this.toggleInlineSearch();
      }
    }
  }

  logout(): void {
    // Will be implemented with auth service later
    this.isLoggedIn = false;
  }
}

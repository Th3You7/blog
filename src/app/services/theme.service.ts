import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeKey = 'darkMode';
  private darkMode = new BehaviorSubject<boolean>(this.loadInitialTheme());

  darkMode$ = this.darkMode.asObservable();

  constructor() {}

  private loadInitialTheme(): boolean {
    const savedTheme = localStorage.getItem(this.darkModeKey);

    if (savedTheme) {
      return JSON.parse(savedTheme);
    } else {
      // Check if user prefers dark mode at system level
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  init() {
    this.setThemeClass(this.darkMode.value);
  }

  toggleTheme() {
    const newValue = !this.darkMode.value;
    this.darkMode.next(newValue);
    localStorage.setItem(this.darkModeKey, JSON.stringify(newValue));
    this.setThemeClass(newValue);
  }

  private setThemeClass(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

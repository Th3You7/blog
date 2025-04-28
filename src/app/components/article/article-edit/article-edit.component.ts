import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './article-edit.component.html',
})
export class ArticleEditComponent implements OnInit {
  articleForm: FormGroup;
  articleId: string | null = null;
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id');
    if (this.articleId) {
      this.loadArticle();
    } else {
      this.errorMessage = 'No article ID provided';
      setTimeout(() => this.router.navigate(['/dashboard']), 2000);
    }
  }

  loadArticle(): void {
    if (!this.articleId) return;

    this.isLoading = true;
    this.errorMessage = null;

    this.articleService.getArticleById(this.articleId).subscribe({
      next: (article) => {
        this.articleForm.patchValue({
          title: article.title,
          content: article.content,
          category: article.category,
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage =
          'Failed to load article. It may have been deleted or does not exist.';
        console.error('Error loading article:', error);
        this.isLoading = false;

        // Redirect back to dashboard after delay
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
    });
  }

  onSubmit(): void {
    if (this.articleForm.invalid || !this.articleId) {
      this.markFormGroupTouched(this.articleForm);
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    const article = {
      ...this.articleForm.value,
      id: this.articleId,
      authorId: 1, // This should come from your auth service
    };

    this.articleService.updateArticle(this.articleId, article).subscribe({
      next: () => {
        this.successMessage = 'Article updated successfully!';
        this.isSubmitting = false;

        // Navigate after a short delay to show success message
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Failed to update article. Please try again.';
        console.error('Error updating article:', error);
        this.isSubmitting = false;
      },
    });
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}

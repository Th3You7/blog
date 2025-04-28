import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-article-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './article-add.component.html',
})
export class ArticleAddComponent {
  articleForm: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    public router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.articleForm.invalid) {
      this.markFormGroupTouched(this.articleForm);
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    const article = {
      ...this.articleForm.value,
      authorId: 1, // This should come from your auth service
    };

    this.articleService.createArticle(article).subscribe({
      next: () => {
        this.successMessage = 'Article created successfully!';
        this.isSubmitting = false;

        // Navigate after a short delay to show success message
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Failed to create article. Please try again.';
        console.error('Error creating article:', error);
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

export interface Comment {
  id: number;
  articleId: number;
  userId: number;
  authorName: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

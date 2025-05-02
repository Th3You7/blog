export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  authorId: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
  imageUrl?: string;
}

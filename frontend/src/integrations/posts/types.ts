export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export interface Author {
  fullName: string;
}

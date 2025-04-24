export interface User {
  id: number;
  email: string;
  password?: string; // Optional in responses
  name: string;
  role?: 'user' | 'admin'; // Role for authorization
  createdAt?: string;
}

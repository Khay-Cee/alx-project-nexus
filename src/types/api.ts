export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  poster_image: string;
  trailer_url?: string;
  release_date: string;
  genre: string;
  director: string;
  average_rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  };
  movie: number;
  rating: number;
  review_text: string;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewData {
  movie: number;
  rating: number;
  review_text: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}
import api from './config';
import { mockMovies, mockGenres, mockReviews, mockUser, delay } from '@/data/mockData';
import type { Movie, Review, CreateReviewData } from '@/types/api';

export type { Movie, Review, CreateReviewData };

export const moviesAPI = {
  getMovies: async (params?: { search?: string; genre?: string; page?: number }): Promise<{
    results: Movie[];
    count: number;
    next: string | null;
    previous: string | null;
  }> => {
    await delay(800); // Simulate API delay
    
    let filteredMovies = [...mockMovies];
    
    // Filter by search
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      filteredMovies = filteredMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.description.toLowerCase().includes(searchTerm) ||
        movie.director.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by genre
    if (params?.genre) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.genre.toLowerCase() === params.genre?.toLowerCase()
      );
    }
    
    // Pagination
    const page = params?.page || 1;
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedMovies = filteredMovies.slice(startIndex, endIndex);
    
    return {
      results: paginatedMovies,
      count: filteredMovies.length,
      next: endIndex < filteredMovies.length ? `page=${page + 1}` : null,
      previous: page > 1 ? `page=${page - 1}` : null,
    };
  },

  getMovie: async (id: number): Promise<Movie> => {
    await delay(500);
    
    const movie = mockMovies.find(m => m.id === id);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  },

  getMovieReviews: async (movieId: number): Promise<Review[]> => {
    await delay(600);
    
    return mockReviews.filter(review => review.movie === movieId);
  },

  createReview: async (data: CreateReviewData): Promise<Review> => {
    await delay(700);
    
    const newReview: Review = {
      id: Math.max(...mockReviews.map(r => r.id)) + 1,
      user: mockUser,
      movie: data.movie,
      rating: data.rating,
      review_text: data.review_text,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockReviews.push(newReview);
    return newReview;
  },

  updateReview: async (reviewId: number, data: Partial<CreateReviewData>): Promise<Review> => {
    await delay(500);
    
    const reviewIndex = mockReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex === -1) {
      throw new Error('Review not found');
    }
    
    const updatedReview = {
      ...mockReviews[reviewIndex],
      ...data,
      updated_at: new Date().toISOString(),
    };
    
    mockReviews[reviewIndex] = updatedReview;
    return updatedReview;
  },

  deleteReview: async (reviewId: number): Promise<void> => {
    await delay(400);
    
    const reviewIndex = mockReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex === -1) {
      throw new Error('Review not found');
    }
    
    mockReviews.splice(reviewIndex, 1);
  },

  getGenres: async (): Promise<string[]> => {
    await delay(300);
    return mockGenres;
  },
};
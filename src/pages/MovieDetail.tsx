import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Star, Calendar, User, Clock, Play, Loader2 } from 'lucide-react';
import { moviesAPI, CreateReviewData } from '@/api/movies';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';

const StarRating: React.FC<{
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
}> = ({ rating, onRatingChange, readonly = false }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange?.(star)}
          className={`${
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
          } transition-transform`}
          disabled={readonly}
        >
          <Star
            className={`h-5 w-5 ${
              star <= rating
                ? 'text-accent fill-accent'
                : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const movieId = parseInt(id || '0');

  // Fetch movie details
  const { data: movie, isLoading: movieLoading, error: movieError } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => moviesAPI.getMovie(movieId),
    enabled: !!movieId,
  });

  // Fetch movie reviews
  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ['movieReviews', movieId],
    queryFn: () => moviesAPI.getMovieReviews(movieId),
    enabled: !!movieId,
  });

  // Create review mutation
  const createReviewMutation = useMutation({
    mutationFn: (data: CreateReviewData) => moviesAPI.createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movieReviews', movieId] });
      queryClient.invalidateQueries({ queryKey: ['movie', movieId] });
      setNewReviewText('');
      setNewReviewRating(5);
      toast.success('Review submitted successfully!');
    },
    onError: () => {
      toast.error('Failed to submit review');
    },
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to submit a review');
      return;
    }
    
    if (newReviewText.trim().length < 10) {
      toast.error('Review must be at least 10 characters long');
      return;
    }

    setIsSubmittingReview(true);
    try {
      await createReviewMutation.mutateAsync({
        movie: movieId,
        rating: newReviewRating,
        review_text: newReviewText.trim(),
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatReleaseYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  if (movieLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (movieError || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Movie not found</h2>
          <p className="text-muted-foreground mb-4">The movie you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const userReview = reviews?.find(review => review.user.id === user?.id);

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Movies
        </Button>
      </div>

      {/* Movie Header */}
      <section className="relative">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Movie Poster */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <img
                  src={movie.poster_image}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-lg max-w-sm mx-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x600/1f1f23/ffffff?text=No+Image';
                  }}
                />
              </div>
            </div>

            {/* Movie Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatReleaseYear(movie.release_date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{movie.director}</span>
                  </div>
                  <div className="capitalize px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                    {movie.genre}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <StarRating rating={movie.average_rating} readonly />
                    <span className="text-lg font-semibold">
                      {movie.average_rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    ({movie.total_reviews} review{movie.total_reviews !== 1 ? 's' : ''})
                  </span>
                </div>

                {/* Trailer Button */}
                {movie.trailer_url && (
                  <Button
                    onClick={() => window.open(movie.trailer_url, '_blank')}
                    className="primary-gradient glow-primary mb-6"
                    size="lg"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Watch Trailer
                  </Button>
                )}

                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Synopsis</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {movie.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Reviews</h2>

          {/* Add Review Form */}
          {user && !userReview && (
            <Card className="glass-card mb-8">
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
                <CardDescription>
                  Share your thoughts about this movie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div>
                    <Label>Your Rating</Label>
                    <div className="mt-2">
                      <StarRating
                        rating={newReviewRating}
                        onRatingChange={setNewReviewRating}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="review">Your Review</Label>
                    <Textarea
                      id="review"
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="Write your review here..."
                      className="mt-2 min-h-32 bg-muted/50 border-border/50 focus:border-primary"
                      required
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Minimum 10 characters
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmittingReview || newReviewText.trim().length < 10}
                    className="primary-gradient"
                  >
                    {isSubmittingReview ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Reviews List */}
          {reviewsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="animate-pulse glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 bg-muted rounded-full" />
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-24" />
                        <div className="h-3 bg-muted rounded w-32" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : reviews && reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {review.user.first_name} {review.user.last_name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            @{review.user.username}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StarRating rating={review.rating} readonly />
                        <span className="text-sm text-muted-foreground">
                          {formatDate(review.created_at)}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {review.review_text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to review this movie!
              </p>
              {!user && (
                <Button onClick={() => navigate('/login')} variant="outline">
                  Login to Review
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MovieDetail;
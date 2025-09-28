import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, User } from 'lucide-react';
import { Movie } from '@/api/movies';
import { Card, CardContent } from '@/components/ui/card';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-400';
    if (rating >= 3) return 'text-yellow-400';
    if (rating >= 2) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <Card className="glass-card hover:scale-105 transition-all duration-300 hover:glow-primary overflow-hidden h-full">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster_image}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/300x450/1f1f23/ffffff?text=No+Image';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating Badge */}
          {movie.average_rating > 0 && (
            <div className="absolute top-2 right-2 glass-card px-2 py-1 flex items-center space-x-1">
              <Star className={`h-3 w-3 fill-current ${getRatingColor(movie.average_rating)}`} />
              <span className="text-xs font-medium">{movie.average_rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {movie.title}
          </h3>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(movie.release_date)}</span>
              <span className="text-accent">•</span>
              <span className="capitalize">{movie.genre}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <User className="h-3 w-3" />
              <span className="truncate">{movie.director}</span>
            </div>

            {movie.total_reviews > 0 && (
              <div className="flex items-center space-x-1 text-xs">
                <span>{movie.total_reviews} review{movie.total_reviews !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-3 line-clamp-3 leading-relaxed">
            {movie.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
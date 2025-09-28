import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Film, Search, Filter, Loader2 } from 'lucide-react';
import { moviesAPI, Movie } from '@/api/movies';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import heroImage from '@/assets/hero-cinema.jpg';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch movies
  const { data: moviesData, isLoading: moviesLoading, error: moviesError } = useQuery({
    queryKey: ['movies', searchQuery, selectedGenre, currentPage],
    queryFn: () => moviesAPI.getMovies({
      search: searchQuery || undefined,
      genre: selectedGenre || undefined,
      page: currentPage,
    }),
  });

  // Fetch genres
  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: moviesAPI.getGenres,
  });

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchParams({
      ...(searchQuery && { search: searchQuery }),
      ...(selectedGenre && { genre: selectedGenre }),
    });
  };

  const handleGenreChange = (genre: string) => {
    const actualGenre = genre === 'all' ? '' : genre;
    setSelectedGenre(actualGenre);
    setCurrentPage(1);
    setSearchParams({
      ...(searchQuery && { search: searchQuery }),
      ...(actualGenre && { genre: actualGenre }),
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setCurrentPage(1);
    setSearchParams({});
  };

  if (moviesError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Film className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Oops! Something went wrong</h2>
          <p className="text-muted-foreground">Unable to load movies. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Cinema Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Discover Amazing{' '}
            <span className="accent-gradient bg-clip-text text-transparent">Movies</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore thousands of movies, read reviews, and share your thoughts with fellow movie enthusiasts.
          </p>
          
          {/* Hero Search */}
          <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg glass-card border-border/50"
              />
            </div>
            <Button type="submit" size="lg" className="ml-2 primary-gradient glow-primary">
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Filters Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedGenre || 'all'} onValueChange={handleGenreChange}>
              <SelectTrigger className="w-48 glass-card border-border/50">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres?.map((genre) => (
                  <SelectItem key={genre} value={genre} className="capitalize">
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {(searchQuery || selectedGenre) && (
              <Button variant="outline" onClick={clearFilters} size="sm">
                Clear Filters
              </Button>
            )}
          </div>

          {moviesData && (
            <p className="text-muted-foreground">
              {moviesData.count} movie{moviesData.count !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {/* Movies Grid */}
        {moviesLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] bg-muted rounded-lg mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : moviesData?.results.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No movies found</h2>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all movies.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Show All Movies
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {moviesData?.results.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            {moviesData && (moviesData.next || moviesData.previous) && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={!moviesData.previous}
                >
                  Previous
                </Button>
                <span className="text-muted-foreground">
                  Page {currentPage}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={!moviesData.next}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
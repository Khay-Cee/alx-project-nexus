import { Movie, Review, User } from '@/types/api';

export const mockUser: User = {
  id: 1,
  username: 'moviefan',
  email: 'john@example.com',
  first_name: 'John',
  last_name: 'Doe',
};

export const mockGenres = [
  'action',
  'adventure',
  'comedy',
  'drama',
  'horror',
  'sci-fi',
  'thriller',
  'romance',
  'animation',
  'documentary'
];

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster_image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    trailer_url: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    release_date: "2008-07-18",
    genre: "action",
    director: "Christopher Nolan",
    average_rating: 4.8,
    total_reviews: 156,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster_image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    trailer_url: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    release_date: "2010-07-16",
    genre: "sci-fi",
    director: "Christopher Nolan",
    average_rating: 4.7,
    total_reviews: 203,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster_image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    trailer_url: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    release_date: "2014-11-07",
    genre: "sci-fi",
    director: "Christopher Nolan",
    average_rating: 4.6,
    total_reviews: 189,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 4,
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster_image: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    trailer_url: "https://www.youtube.com/watch?v=sY1S34973zA",
    release_date: "1972-03-24",
    genre: "drama",
    director: "Francis Ford Coppola",
    average_rating: 4.9,
    total_reviews: 267,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 5,
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster_image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    trailer_url: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
    release_date: "1994-10-14",
    genre: "drama",
    director: "Quentin Tarantino",
    average_rating: 4.7,
    total_reviews: 234,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 6,
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster_image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    trailer_url: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
    release_date: "1999-03-31",
    genre: "sci-fi",
    director: "The Wachowskis",
    average_rating: 4.5,
    total_reviews: 178,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 7,
    title: "Goodfellas",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    poster_image: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    trailer_url: "https://www.youtube.com/watch?v=qo5jJpHtI1Y",
    release_date: "1990-09-21",
    genre: "drama",
    director: "Martin Scorsese",
    average_rating: 4.6,
    total_reviews: 145,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 8,
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    poster_image: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    trailer_url: "https://www.youtube.com/watch?v=bLvqoHBptjg",
    release_date: "1994-07-06",
    genre: "drama",
    director: "Robert Zemeckis",
    average_rating: 4.4,
    total_reviews: 198,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 9,
    title: "The Avengers",
    description: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    poster_image: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    trailer_url: "https://www.youtube.com/watch?v=eOrNdBpGMv8",
    release_date: "2012-05-04",
    genre: "action",
    director: "Joss Whedon",
    average_rating: 4.2,
    total_reviews: 289,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 10,
    title: "Spirited Away",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, a world where humans are changed into beasts.",
    poster_image: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    trailer_url: "https://www.youtube.com/watch?v=ByXuk9QqQkk",
    release_date: "2001-07-20",
    genre: "animation",
    director: "Hayao Miyazaki",
    average_rating: 4.8,
    total_reviews: 167,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 11,
    title: "Parasite",
    description: "A poor family, the Kims, con their way into becoming the servants of a rich family, the Parks. But their easy life gets complicated when their deception is threatened with exposure.",
    poster_image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    trailer_url: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    release_date: "2019-05-30",
    genre: "thriller",
    director: "Bong Joon-ho",
    average_rating: 4.7,
    total_reviews: 156,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 12,
    title: "Get Out",
    description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
    poster_image: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    trailer_url: "https://www.youtube.com/watch?v=DzfpyUB60YY",
    release_date: "2017-02-24",
    genre: "horror",
    director: "Jordan Peele",
    average_rating: 4.3,
    total_reviews: 134,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

export const mockReviews: Review[] = [
  {
    id: 1,
    user: {
      id: 2,
      username: 'cinephile123',
      first_name: 'Alice',
      last_name: 'Johnson',
    },
    movie: 1,
    rating: 5,
    review_text: "Absolutely phenomenal! Heath Ledger's performance as the Joker is legendary. This movie redefined what superhero films could be.",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    user: {
      id: 3,
      username: 'moviebuff',
      first_name: 'Bob',
      last_name: 'Smith',
    },
    movie: 1,
    rating: 5,
    review_text: "Christopher Nolan's masterpiece. The complexity of the story, the incredible action sequences, and the moral dilemmas make this a perfect film.",
    created_at: "2024-01-20T14:15:00Z",
    updated_at: "2024-01-20T14:15:00Z"
  },
  {
    id: 3,
    user: {
      id: 4,
      username: 'filmcritic',
      first_name: 'Sarah',
      last_name: 'Wilson',
    },
    movie: 1,
    rating: 4,
    review_text: "Great film overall, though I felt some scenes could have been shorter. The Joker steals every scene he's in.",
    created_at: "2024-01-25T16:45:00Z",
    updated_at: "2024-01-25T16:45:00Z"
  },
  {
    id: 4,
    user: {
      id: 2,
      username: 'cinephile123',
      first_name: 'Alice',
      last_name: 'Johnson',
    },
    movie: 2,
    rating: 5,
    review_text: "Inception is a mind-bending masterpiece that rewards multiple viewings. The concept is brilliantly executed.",
    created_at: "2024-02-01T12:00:00Z",
    updated_at: "2024-02-01T12:00:00Z"
  },
  {
    id: 5,
    user: {
      id: 5,
      username: 'scifan',
      first_name: 'Mike',
      last_name: 'Brown',
    },
    movie: 2,
    rating: 4,
    review_text: "Complex and engaging, but requires full attention. The visual effects are stunning.",
    created_at: "2024-02-05T09:30:00Z",
    updated_at: "2024-02-05T09:30:00Z"
  }
];

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
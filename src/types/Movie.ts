export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  releaseYear: number;
  director: string;
  plot: string;
  cast: string[];
  genre: string[];
  duration: number; // dakika cinsinden
  rating: number;
  trailerUrl?: string;
} 
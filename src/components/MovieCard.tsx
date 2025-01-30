import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  isFavorite: boolean;
  onFavoriteClick: (id: number) => void;
}

const MovieCard = ({ movie, onClick, isFavorite, onFavoriteClick }: MovieCardProps) => {
  return (
    <div 
      className="movie-card" 
      onClick={() => onClick(movie)}
    >
      <div className="favorite-button" onClick={(e) => {
        e.stopPropagation();
        onFavoriteClick(movie.id);
      }}>
        <span className={`heart-icon ${isFavorite ? 'favorite' : ''}`}>
          ❤
        </span>
      </div>
      <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.releaseYear}</p>
        <div className="movie-rating">⭐ {movie.rating}/10</div>
      </div>
    </div>
  );
};

export default MovieCard; 
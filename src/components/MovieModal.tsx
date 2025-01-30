import { Movie } from '../types/Movie';
import { useState } from 'react';
import RatingStars from './RatingStars';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
  isFavorite: boolean;
  onFavoriteClick: (id: number) => void;
  inWatchlist: boolean;
  onWatchlistClick: (id: number) => void;
  userRating?: number;
  onRate: (movieId: number, rating: number) => void;
  comments: string[];
  onAddComment: (movieId: number, comment: string) => void;
  onAddToRecent: (movieId: number) => void;
  isInRecentlyViewed: boolean;
}

const MovieModal = ({
  movie,
  onClose,
  isFavorite,
  onFavoriteClick,
  inWatchlist,
  onWatchlistClick,
  userRating,
  onRate,
  comments,
  onAddComment,
  onAddToRecent,
  isInRecentlyViewed,
}: MovieModalProps) => {
  const [newComment, setNewComment] = useState('');

  if (!movie) return null;

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(movie.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={handleContentClick}>
        <button className="close-button" onClick={onClose}>✕</button>
        
        <div className="modal-grid">
          <div className="modal-poster-section">
            <img src={movie.posterUrl} alt={movie.title} className="modal-poster" />
            
            <div className="modal-actions">
              <button
                className={`action-button ${isFavorite ? 'active' : ''}`}
                onClick={() => onFavoriteClick(movie.id)}
              >
                {isFavorite ? '❤️ Favorilerden Çıkar' : '🤍 Favorilere Ekle'}
              </button>
              <button
                className={`action-button ${inWatchlist ? 'active' : ''}`}
                onClick={() => onWatchlistClick(movie.id)}
              >
                {inWatchlist ? '✓ İzleme Listesinden Çıkar' : '+ İzleme Listesine Ekle'}
              </button>
              <button
                className={`action-button ${isInRecentlyViewed ? 'active' : ''}`}
                onClick={() => onAddToRecent(movie.id)}
              >
                {isInRecentlyViewed ? '✓ Son İzlenenlerde' : '👁️ Son İzlenenlere Ekle'}
              </button>
            </div>

            {movie.trailerUrl && (
              <div className="modal-trailer">
                <h3>Fragman</h3>
                <iframe
                  width="100%"
                  height="315"
                  src={movie.trailerUrl}
                  title={`${movie.title} Fragmanı`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          <div className="modal-details">
            <h2>{movie.title} ({movie.releaseYear})</h2>
            <p><strong>Yönetmen:</strong> {movie.director}</p>
            <p><strong>Süre:</strong> {movie.duration} dakika</p>
            <p><strong>Puan:</strong> {movie.rating}/10</p>
            <p><strong>Tür:</strong> {movie.genre.join(', ')}</p>
            <p><strong>Oyuncular:</strong> {movie.cast.join(', ')}</p>
            <p><strong>Konu:</strong> {movie.plot}</p>

            <div className="user-rating-section">
              <h3>Puanınız</h3>
              <RatingStars
                rating={userRating || 0}
                onRate={(rating) => onRate(movie.id, rating)}
              />
            </div>

            <div className="comments-section">
              <h3>Yorumlar</h3>
              <textarea
                className="comment-input"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Yorumunuzu yazın..."
              />
              <button
                className="action-button"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                Yorum Ekle
              </button>
              <div className="comment-list">
                {comments.map((comment, index) => (
                  <div key={index} className="comment">
                    {comment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal; 
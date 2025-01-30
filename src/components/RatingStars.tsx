interface RatingStarsProps {
  rating: number;
  onRate: (rating: number) => void;
  readonly?: boolean;
}

const RatingStars = ({ rating, onRate, readonly = false }: RatingStarsProps) => {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''} ${readonly ? 'readonly' : ''}`}
          onClick={() => !readonly && onRate(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars; 
import "./Rating.scss";
import { generateStars } from "@utils/productUtils";

type Props = {
  rating: number;
};

function Rating({ rating }: Props) {
  const intRating = Math.round(rating);
  const stars = generateStars(intRating);

  return (
    <ul className="rating__container">
      {stars.map((star) => (
        <li key={star.key}>{star}</li>
      ))}
    </ul>
  );
}

export default Rating;

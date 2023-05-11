import "./Rating.scss";
import StarBlackIcon from "@components/Icons/StarBlackIcon";
import StarWhiteIcon from "@components/Icons/StarWhiteIcon";

type Props = {
  rating: number;
};

function Rating({ rating }: Props) {
  const intRating = Math.round(rating);

  return (
    <div className="rating__container">
      {Array.from({ length: intRating }, (_, index) => (
        <StarBlackIcon key={`star-${index}`} />
      ))}
      {Array.from({ length: 5 - intRating }, (_, index) => (
        <StarWhiteIcon key={`star-${intRating + index}`} />
      ))}
    </div>
  );
}

export default Rating;

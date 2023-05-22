import starBlackIcon from "@assets/icons/starBlackIcon.svg";
import starYellowIcon from "@assets/icons/starYellowIcon.svg";
import starBigWhiteIcon from "@assets/icons/starBigWhiteIcon.svg";
import starSmallWhiteIcon from "@assets/icons/starSmallWhiteIcon.svg";

export function generateStars(
  intRating: number,
  isMonochrome: boolean
): JSX.Element[] {
  const fullStars = Array.from({ length: intRating }, (_, index) => (
    <img
      key={`star-${index}`}
      src={isMonochrome ? starBlackIcon : starYellowIcon}
      alt="Full star icon"
    />
  ));

  const emptyStars = Array.from({ length: 5 - intRating }, (_, index) => (
    <img
      key={`star-${intRating + index}`}
      src={isMonochrome ? starBigWhiteIcon : starSmallWhiteIcon}
      alt="Empty star icon"
    />
  ));

  return [...fullStars, ...emptyStars];
}

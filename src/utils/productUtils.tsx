import StarBlackIcon from "@components/Icons/StarBlackIcon";
import StarWhiteIcon from "@components/Icons/StarWhiteIcon";

export function generateStars(intRating: number): JSX.Element[] {
  const fullStars = Array.from({ length: intRating }, (_, index) => (
    <StarBlackIcon key={`star-${index}`} />
  ));

  const emptyStars = Array.from({ length: 5 - intRating }, (_, index) => (
    <StarWhiteIcon key={`star-${intRating + index}`} />
  ));

  return [...fullStars, ...emptyStars];
}

export function formatPrice(price: number) {
  return price.toFixed(2);
}

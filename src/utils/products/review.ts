export function getReviewText(reviewCount: number) {
  if (reviewCount === 1) {
    return "(1 customer review)";
  } else if (reviewCount > 1) {
    return `(${reviewCount} customer reviews)`;
  }
  return null;
}

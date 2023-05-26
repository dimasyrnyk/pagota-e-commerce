import { useState } from "react";

import "./TabsBlock.scss";
import { IReview, REVIEW_TEXT_LENGTH, ReviewBtn } from "@constants/products";
import Rating from "@components/Rating/Rating";

type Props = {
  review: IReview;
};

function ReviewItem({ review }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showedReviewText, setShowedReviewText] = useState<string>(
    review.text.slice(0, REVIEW_TEXT_LENGTH)
  );
  const isLargeText = review.text.length > REVIEW_TEXT_LENGTH;

  const handleShowMore = () => {
    if (isExpanded) {
      setShowedReviewText(review.text.slice(0, REVIEW_TEXT_LENGTH));
    } else {
      setShowedReviewText(review.text);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <li>
      <span className="review-item__author">{review.author}</span>
      <Rating rating={review.rating} />
      <p className="review-item__text">
        {showedReviewText}
        {isLargeText && !isExpanded && "..."}
        {isLargeText && (
          <button
            className="review-item__show-more-btn"
            onClick={handleShowMore}
          >
            {isExpanded ? ReviewBtn.LESS : ReviewBtn.MORE}
          </button>
        )}
      </p>
      <span className="review-item__date">{review.date}</span>
    </li>
  );
}

export default ReviewItem;

import { useState } from "react";

import "./TabsBlock.scss";
import { IReview, REVIEW_QUANTITY } from "@constants/products";
import SecondaryBtn from "@components/Buttons/SecondaryBtn/SecondaryBtn";
import ReviewItem from "./ReviewItem";

type Props = {
  reviews: IReview[];
};

function ReviewsList({ reviews }: Props) {
  const [showedReviewsLength, setShowedReviewsLength] =
    useState<number>(REVIEW_QUANTITY);
  const [showButton, setShowButton] = useState<boolean>(
    reviews.length > REVIEW_QUANTITY
  );
  const showedReviews = reviews.slice(0, showedReviewsLength);

  const handleShowMore = () => {
    const newReviewsLength = showedReviewsLength + REVIEW_QUANTITY;
    setShowedReviewsLength(newReviewsLength);
    setShowButton(reviews.length > newReviewsLength);
  };

  if (!reviews.length) {
    return <div>There are no reviews</div>;
  }

  return (
    <div className="tabs-block__reviews-container">
      <div className="tabs-block__reviews">
        <ul className="tabs-block__reviews-list">
          {showedReviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
            />
          ))}
        </ul>
        {showButton ? (
          <SecondaryBtn
            className="tabs-block__reviews-btn"
            onClick={handleShowMore}
          >
            Show more reviews
          </SecondaryBtn>
        ) : null}
      </div>
    </div>
  );
}

export default ReviewsList;

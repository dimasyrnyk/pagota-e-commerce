import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SideBar.scss";
import { setFilterRatings } from "@store/filters/actions";
import { AppDispatch, RootState } from "@store/index";
import Rating from "@components/Rating/Rating";
import { SIDEBAR_RATING } from "@constants/app";
import CustomCheckbox from "@components/CustomCheckbox/CustomCheckbox";
import { updateUrl } from "@utils/filtersUtils";

function SideBarRatingsList() {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRatingToggle = (selectedRating: number) => {
    const updatedRatings = filters.ratings.includes(selectedRating)
      ? filters.ratings.filter((rating) => rating !== selectedRating)
      : [...filters.ratings, selectedRating];
    dispatch(setFilterRatings(updatedRatings));
    updateUrl({ ...filters, ratings: updatedRatings }, navigate, location);
  };

  const isRatingChecked = (rating: number) => {
    return filters.ratings.includes(rating);
  };

  return (
    <div className="sidebar__rating">
      <h3>Rating</h3>
      <ul className="sidebar__brands-list">
        {SIDEBAR_RATING.map((rating) => {
          return (
            <CustomCheckbox
              key={rating}
              checked={isRatingChecked(rating)}
              onChange={() => handleRatingToggle(rating)}
              label={
                <Rating
                  rating={rating}
                  isMonochrome={false}
                />
              }
            />
          );
        })}
      </ul>
    </div>
  );
}

export default SideBarRatingsList;

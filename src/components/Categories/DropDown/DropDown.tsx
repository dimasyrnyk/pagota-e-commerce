import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./DropDown.scss";
import { AppDispatch, RootState } from "@store/index";
import { updateUrl } from "@utils/filtersUtils";
import { resetFilters } from "@store/filters/actions";
import { ALL_CATEGORIES } from "@constants/categories";

type Props = {
  brands: string[];
};

function DropDown({ brands }: Props) {
  const { minPrice, maxPrice } = useSelector(
    (state: RootState) => state.products
  );
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const handleBrandClick = (selectedBrand: string) => {
    const resetFiltersWithNewBrand = {
      query: "",
      category: ALL_CATEGORIES,
      brands: [selectedBrand],
      ratings: [],
      prices: { min: minPrice, max: maxPrice },
    };
    dispatch(resetFilters(resetFiltersWithNewBrand));
    updateUrl(resetFiltersWithNewBrand, navigate, location);
  };

  return (
    <ul className="dropdown__container">
      {brands.map((brand, index) => (
        <li
          key={Date.now() + index}
          className="dropdown__title"
          onClick={() => handleBrandClick(brand)}
        >
          {brand}
        </li>
      ))}
    </ul>
  );
}

export default DropDown;

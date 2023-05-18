import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./DropDown.scss";
import { AppDispatch } from "@store/index";
import { getFiltersWithNewBrand, updateUrl } from "@utils/filtersUtils";
import { resetFilters } from "@store/filters/actions";

type Props = {
  brands: string[];
  category: string;
};

function DropDown({ brands, category }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const handleBrandClick = (selectedBrand: string) => {
    const resetFiltersWithNewBrand = getFiltersWithNewBrand(
      category,
      selectedBrand
    );
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

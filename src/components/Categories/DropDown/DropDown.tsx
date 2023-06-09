import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./DropDown.scss";
import { AppDispatch } from "@store/index";
import { updateFilters } from "@store/filters/actions";
import { getNewFilters } from "@utils/filters/filterProducts";
import { updateUrl } from "@utils/filters/searchParams";

type Props = {
  brands: string[];
  category: string;
};

function DropDown({ brands, category }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const handleBrandClick = (selectedBrand: string) => {
    const newFilters = getNewFilters({ category, brands: [selectedBrand] });
    dispatch(updateFilters(newFilters));
    updateUrl(newFilters, navigate, location);
    if (location.pathname !== "/products") {
      navigate("/products");
    }
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

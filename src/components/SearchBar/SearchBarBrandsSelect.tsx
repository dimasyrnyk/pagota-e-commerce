import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SearchBar.scss";
import { resetFilters } from "@store/filters/actions";
import { AppDispatch, RootState } from "@store/index";
import { updateUrl } from "@utils/filtersUtils";
import { getCategoryBrands } from "@utils/productUtils";
import { ALL_CATEGORIES } from "@constants/categories";

type Props = {
  show: boolean;
  setShow: (showBrands: boolean) => void;
  query: string;
  setQuery: (searchQuery: string) => void;
};

function SearchBarBrandSelect({ show, setShow, query, setQuery }: Props) {
  const filters = useSelector((state: RootState) => state.filters);
  const { minPrice, maxPrice } = useSelector(
    (state: RootState) => state.products
  );
  const [categoryBrands, setCategoryBrands] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const updatedCategoryBrands = getCategoryBrands(filters.category);
    setCategoryBrands(updatedCategoryBrands);
  }, [filters.category]);

  const handleBrandSelect = (selectedBrand: string) => {
    const resetFiltersWithNewBrand = {
      query: "",
      category: ALL_CATEGORIES,
      brands: [selectedBrand],
      ratings: [],
      prices: { min: minPrice, max: maxPrice },
    };
    dispatch(resetFilters(resetFiltersWithNewBrand));
    updateUrl(resetFiltersWithNewBrand, navigate, location);
    if (location.pathname !== "/products") {
      navigate("/products");
    }
    setShow(false);
    setQuery("");
  };

  if (!show) {
    return null;
  }

  return (
    <ul className="search-bar__brands-list">
      {categoryBrands
        .filter((brand) => brand.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 10)
        .map((brand) => (
          <li
            className="search-bar__brands-list-item"
            onClick={() => handleBrandSelect(brand)}
            key={brand}
          >
            {brand}
          </li>
        ))}
    </ul>
  );
}

export default SearchBarBrandSelect;

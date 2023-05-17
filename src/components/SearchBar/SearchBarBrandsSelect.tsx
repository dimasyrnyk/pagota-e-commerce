import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SearchBar.scss";
import { resetFilters } from "@store/filters/actions";
import { AppDispatch, RootState } from "@store/index";
import { getFiltersWithNewBrand, updateUrl } from "@utils/filtersUtils";
import { Brand } from "@constants/products";

type Props = {
  show: boolean;
  setShow: (showBrands: boolean) => void;
  query: string;
  setQuery: (searchQuery: string) => void;
};

function SearchBarBrandSelect({ show, setShow, query, setQuery }: Props) {
  const { brands } = useSelector((state: RootState) => state.products);
  const [showedBrands, setShowedBrands] = useState<Brand[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const updatedBrands = brands
      .filter((brand) => brand.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10);
    setShowedBrands(updatedBrands);
  }, [query]);

  const handleBrandSelect = (selectedBrand: Brand) => {
    const resetFiltersWithNewBrand = getFiltersWithNewBrand(
      selectedBrand.category,
      selectedBrand.name
    );
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
      {showedBrands.map((brand) => (
        <li
          className="search-bar__brands-list-item"
          onClick={() => handleBrandSelect(brand)}
          key={brand.name}
        >
          <span className="item__name">{brand.name}</span>
          <span className="item__category">
            <span className="text-small">category</span>
            {brand.category}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default SearchBarBrandSelect;

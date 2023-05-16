import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SearchBar.scss";
import CustomSelect from "@components/CustomSelect/CustomSelect";
import SearchIcon from "@components/Icons/SearchIcon";
import CloseBtn from "@components/Buttons/CloseBtn/CloseBtn";
import {
  setFilterBrands,
  setFilterCategory,
  setFilterQuery,
} from "@store/filters/actions";
import { AppDispatch, RootState } from "@store/index";
import { useDebounce } from "../../hooks/useDebbounce";
import { updateUrl } from "@utils/filtersUtils";

function SearchBar() {
  const filters = useSelector((state: RootState) => state.filters);
  const categoriesList = useSelector(
    (state: RootState) => state.products.categories
  );
  const [searchQuery, setSearchQuery] = useState<string>(filters.query);
  const debouncedQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setSearchQuery(filters.query);
  }, [filters.query]);

  useEffect(() => {
    if (debouncedQuery && searchQuery) {
      const newDebouncedQuery = debouncedQuery.replace(/\s+/g, " ").trim();
      dispatch(setFilterQuery(newDebouncedQuery));
      updateUrl({ ...filters, query: newDebouncedQuery }, navigate, location);
    }
  }, [debouncedQuery]);

  const handleCategoryChange = (categoryName: string) => {
    dispatch(setFilterCategory(categoryName));
    dispatch(setFilterBrands([]));
    updateUrl(
      { ...filters, category: categoryName, brands: [] },
      navigate,
      location
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputReset = () => {
    setSearchQuery("");
    dispatch(setFilterQuery(""));
    updateUrl({ ...filters, query: "" }, navigate, location);
  };

  return (
    <div className="search-bar__container">
      <CustomSelect
        title={filters.category}
        options={categoriesList}
        onChange={handleCategoryChange}
      />
      <div className="search-bar__input_wrapper">
        <input
          className="search-bar__input"
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search Products, categories ..."
        />
        {!searchQuery ? (
          <SearchIcon className="search-bar__icon-search" />
        ) : (
          <CloseBtn onClick={handleInputReset} />
        )}
      </div>
    </div>
  );
}

export default SearchBar;

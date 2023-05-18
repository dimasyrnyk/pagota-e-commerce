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
import { updateUrl } from "@utils/filtersUtils";
import SearchBarBrandSelect from "./SearchBarBrandsSelect";

function SearchBar() {
  const filters = useSelector((state: RootState) => state.filters);
  const { categories } = useSelector((state: RootState) => state.products);
  const [searchQuery, setSearchQuery] = useState<string>(filters.query);
  const [showBrands, setShowBrands] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setSearchQuery(filters.query);
  }, [filters.query]);

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
    const searchValue = e.target.value;
    if (searchQuery && !searchValue) {
      dispatch(setFilterQuery(""));
    }
    setSearchQuery(searchValue);
    setShowBrands(!!searchValue);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (searchQuery) {
        dispatch(setFilterQuery(searchQuery));
        updateUrl({ ...filters, query: searchQuery }, navigate, location);
        if (location.pathname !== "/products") {
          navigate("/products");
        }
        setShowBrands(false);
      }
    }
  };

  const handleInputReset = () => {
    setSearchQuery("");
    dispatch(setFilterQuery(""));
    updateUrl({ ...filters, query: "" }, navigate, location);
    setShowBrands(false);
  };

  return (
    <div className="search-bar__container">
      <CustomSelect
        className="search-bar__select"
        title={filters.category}
        options={categories}
        activeOption={filters.category}
        onChange={handleCategoryChange}
      />
      <div className="search-bar__input_wrapper">
        <input
          className="search-bar__input"
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Search Products, categories ..."
        />
        {!searchQuery ? (
          <SearchIcon className="search-bar__icon-search" />
        ) : (
          <CloseBtn onClick={handleInputReset} />
        )}
        <SearchBarBrandSelect
          show={showBrands}
          setShow={setShowBrands}
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>
    </div>
  );
}

export default SearchBar;

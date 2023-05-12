import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./SearchBar.scss";
import CustomSelect from "@components/CustomSelect/CustomSelect";
import SearchIcon from "@components/Icons/SearchIcon";
import CloseBtn from "@components/Buttons/CloseBtn/CloseBtn";
import { setFilterCategory, setFilterQuery } from "@store/filters/actions";
import { AppDispatch, RootState } from "@store/index";
import { useDebounce } from "../../hooks/useDebbounce";

function SearchBar() {
  const { category, query } = useSelector((state: RootState) => state.filters);
  const categoriesList = useSelector(
    (state: RootState) => state.products.categories
  );
  const [searchQuery, setSearchQuery] = useState<string>(query);
  const debouncedQuery = useDebounce(searchQuery, 500);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (debouncedQuery && searchQuery) {
      const newDebouncedQuery = debouncedQuery.replace(/\s+/g, " ").trim();
      dispatch(setFilterQuery(newDebouncedQuery));
    }
  }, [debouncedQuery]);

  const handleCategoryChange = (categoryName: string) => {
    dispatch(setFilterCategory(categoryName));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputReset = () => {
    setSearchQuery("");
    dispatch(setFilterQuery(""));
  };

  return (
    <div className="search-bar__container">
      <CustomSelect
        title={category}
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

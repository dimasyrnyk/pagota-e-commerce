import "./SearchBar.scss";
import CustomSelect from "@components/CustomSelect/CustomSelect";
import SearchIcon from "@components/Icons/SearchIcon";

function SearchBar() {
  return (
    <div className="search-bar__container">
      <CustomSelect />
      <div className="search-bar__input_wrapper">
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search Products, categories ..."
        />
        <SearchIcon className="search-bar__icon-search" />
      </div>
    </div>
  );
}

export default SearchBar;

import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SortBy.scss";
import { AppDispatch, RootState } from "@store/index";
import { setFilterSortType } from "@store/filters/actions";
import { updateUrl } from "@utils/filters/searchParams";
import { SortType } from "@constants/filters";
import CustomSelect from "@components/CustomSelect/CustomSelect";

function SortBy() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const sortTitle = filters.sort === SortType.DEFAULT ? "Select" : filters.sort;

  const handleSelectSortType = (selectedType: string) => {
    const newFilters = { ...filters, sort: selectedType };
    dispatch(setFilterSortType(selectedType));
    updateUrl(newFilters, navigate, location);
  };

  return (
    <div className="sort__container">
      <span>Sort By</span>
      <CustomSelect
        className="sort__select"
        title={sortTitle}
        options={Object.values(SortType)}
        activeOption={filters.sort}
        onChange={handleSelectSortType}
      />
    </div>
  );
}

export default SortBy;

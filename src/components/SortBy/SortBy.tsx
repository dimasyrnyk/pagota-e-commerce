import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import "./SortBy.scss";
import CustomSelect from "@components/CustomSelect/CustomSelect";
import { AppDispatch, RootState } from "@store/index";
import { SortType } from "@constants/filters";
import { setSortType } from "@store/filters/actions";

function SortBy() {
  const filters = useSelector((state: RootState) => state.filters);
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const handleSelectSortType = (selectedType: string) => {
    dispatch(setSortType(selectedType));
  };

  return (
    <div className="sort__container">
      <span>Sort By</span>
      <CustomSelect
        className="sort__select"
        title="Select"
        options={Object.values(SortType)}
        activeOption={filters.sort}
        onChange={handleSelectSortType}
      />
    </div>
  );
}

export default SortBy;

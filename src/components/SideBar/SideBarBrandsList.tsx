import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SideBar.scss";
import { setFilterBrands } from "@store/filters/actions";
import { AppDispatch, RootState } from "@store/index";
import CustomCheckbox from "@components/CustomCheckbox/CustomCheckbox";
import { updateUrl } from "@utils/filtersUtils";
import { useEffect, useState } from "react";
import { getCategoryBrands } from "@utils/productUtils";

function SideBarBrandsList() {
  const filters = useSelector((state: RootState) => state.filters);
  const [categoryBrands, setCategoryBrands] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updatedCategoryBrands = getCategoryBrands(filters.category);
    setCategoryBrands(updatedCategoryBrands);
  }, [filters.category]);

  const handleBrandToggle = (selectedBrand: string) => {
    const updatedBrands = filters.brands.includes(selectedBrand)
      ? filters.brands.filter((brand) => brand !== selectedBrand)
      : [...filters.brands, selectedBrand];
    dispatch(setFilterBrands(updatedBrands));
    updateUrl({ ...filters, brands: updatedBrands }, navigate, location);
  };

  return (
    <div className="sidebar__brands">
      <h3>Brands</h3>
      <ul className="sidebar__brands-list">
        {categoryBrands.map((brand) => {
          const isChecked = filters.brands.includes(brand);
          return (
            <CustomCheckbox
              key={brand}
              checked={isChecked}
              onChange={() => handleBrandToggle(brand)}
              label={brand}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default SideBarBrandsList;

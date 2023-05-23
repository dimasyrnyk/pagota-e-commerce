import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SideBar.scss";
import { setFilterBrands } from "@store/filters/actions";
import { AppDispatch, RootState } from "@store/index";
import { updateUrl } from "@utils/filters/searchParams";
import { getCategoryBrands } from "@utils/products/categories";
import CustomCheckbox from "@components/CustomCheckbox/CustomCheckbox";

function SideBarBrandsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const [categoryBrands, setCategoryBrands] = useState<string[]>([]);

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

  const isBrandChecked = (brand: string) => {
    return filters.brands.includes(brand);
  };

  return (
    <div className="sidebar__brands">
      <h3>Brands</h3>
      <ul className="sidebar__brands-list">
        {categoryBrands.map((brand) => {
          return (
            <CustomCheckbox
              key={brand}
              checked={isBrandChecked(brand)}
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

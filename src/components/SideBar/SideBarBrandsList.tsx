import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SideBar.scss";
import { setFilterBrands } from "@store/filters/actions";
import { AppDispatch, RootState } from "@store/index";
import CustomCheckbox from "@components/CustomCheckbox/CustomCheckbox";
import { ALL_CATEGORIES } from "@constants/categories";
import { updateUrl } from "@utils/filtersUtils";
import { IProduct } from "@constants/products";
import { useEffect, useState } from "react";

function SideBarBrandsList() {
  const filters = useSelector((state: RootState) => state.filters);
  const { allProducts, brands } = useSelector(
    (state: RootState) => state.products
  );
  const [categoryBrands, setCategoryBrands] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (filters.category !== ALL_CATEGORIES) {
      const updatedCategoryBrands = allProducts.reduce(
        (acc: string[], product: IProduct) => {
          if (product.category === filters.category) {
            acc.push(product.producer);
          }
          return acc;
        },
        []
      );
      console.log();
      setCategoryBrands(updatedCategoryBrands);
    } else {
      setCategoryBrands(brands);
    }
  }, [filters.category]);

  const handleBrandToggle = (selecedBrand: string) => {
    const updatedBrands = filters.brands.includes(selecedBrand)
      ? filters.brands.filter((brand) => brand !== selecedBrand)
      : [...filters.brands, selecedBrand];
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

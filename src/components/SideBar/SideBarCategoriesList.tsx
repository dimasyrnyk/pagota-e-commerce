import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SideBar.scss";
import ProductsQuantity from "@components/ProductsQuantity/ProductsQuantity";
import { getCategoryLength } from "@utils/productUtils";
import { setFilterBrands, setFilterCategory } from "@store/filters/actions";
import { AppDispatch, RootState } from "@store/index";
import { isBrandsInNewCategory, updateUrl } from "@utils/filtersUtils";

function SideBarCategoriesList() {
  const filters = useSelector((state: RootState) => state.filters);
  const { categories } = useSelector((state: RootState) => state.products);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryChange = (categoryName: string) => {
    const updatedBrands = isBrandsInNewCategory(categoryName, filters.brands);
    dispatch(setFilterCategory(categoryName));
    dispatch(setFilterBrands(updatedBrands));
    updateUrl(
      { ...filters, category: categoryName, brands: updatedBrands },
      navigate,
      location
    );
  };

  return (
    <div className="sidebar__categories">
      <h3>Categories</h3>
      <ul className="sidebar__categories-list">
        {categories.map((cat) => (
          <li
            key={cat}
            className={cat === filters.category ? "active-category" : ""}
            onClick={() => handleCategoryChange(cat)}
          >
            <span>{cat}</span>
            <ProductsQuantity quantity={getCategoryLength(cat)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBarCategoriesList;

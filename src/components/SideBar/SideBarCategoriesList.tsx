import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./SideBar.scss";
import { AppDispatch, RootState } from "@store/index";
import { setFilterBrands, setFilterCategory } from "@store/filters/actions";
import { getCategoryLength } from "@utils/products/categories";
import { isBrandsInNewCategory } from "@utils/filters/filterProducts";
import { updateUrl } from "@utils/filters/searchParams";
import ProductsQuantity from "@components/ProductsQuantity/ProductsQuantity";

function SideBarCategoriesList() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const { categories } = useSelector((state: RootState) => state.products);

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

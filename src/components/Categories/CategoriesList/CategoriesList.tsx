import { useSelector } from "react-redux";

import "./CategoriesList.scss";
import { RootState } from "@store/index";
import { ALL_CATEGORIES } from "@constants/app";
import CategoryItem from "../CategoryItem/CategoryItem";

function CategoriesList() {
  const categories = useSelector(
    (state: RootState) => state.products.categories
  );
  return (
    <nav className="categories__container">
      <ul className="categories__list">
        {categories.map(
          (category) =>
            category !== ALL_CATEGORIES && (
              <CategoryItem
                key={category}
                category={category}
              />
            )
        )}
      </ul>
    </nav>
  );
}

export default CategoriesList;

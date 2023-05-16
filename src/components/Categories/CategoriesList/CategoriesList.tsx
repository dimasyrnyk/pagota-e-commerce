import { useSelector } from "react-redux";

import "./CategoriesList.scss";
import CategoryItem from "../CategoryItem/CategoryItem";
import { RootState } from "@store/index";

function CategoriesList() {
  const categories = useSelector(
    (state: RootState) => state.products.categories
  );
  return (
    <nav className="categories__container">
      <ul className="categories__list">
        {categories.slice(1).map((category) => (
          <CategoryItem
            key={category}
            category={category}
          />
        ))}
      </ul>
    </nav>
  );
}

export default CategoriesList;

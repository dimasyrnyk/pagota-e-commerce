import "./CategoriesList.scss";
import { Categories } from "@constants/categories";
import CategoryItem from "../CategoryItem/CategoryItem";

function CategoriesList() {
  return (
    <nav className="categories__container">
      <ul className="categories__list">
        {Object.values(Categories).map((category) => (
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

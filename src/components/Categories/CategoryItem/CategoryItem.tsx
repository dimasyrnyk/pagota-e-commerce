import { useState } from "react";

import "./CategoryItem.scss";
import { getCategoryBrands } from "@utils/products/categories";
import ChevronDownIcon from "@components/Icons/ChevronDownIcon";
import DropDown from "../DropDown/DropDown";

type Props = {
  category: string;
};

function CategoryItem({ category }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const categoryBrands = getCategoryBrands(category);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li
      className="category-item"
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="category-item__title"
        onMouseEnter={handleMouseEnter}
      >
        {category}
        <ChevronDownIcon className="category-item__icon" />
      </span>

      {isHovered && (
        <DropDown
          category={category}
          brands={categoryBrands}
        />
      )}
    </li>
  );
}

export default CategoryItem;
